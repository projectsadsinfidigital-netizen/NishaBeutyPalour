import { useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import {
  onValue,
  orderByChild,
  query,
  ref,
  set,
  update,
} from 'firebase/database';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  LogOut,
  Phone,
  User as UserIcon,
  XCircle,
} from 'lucide-react';
import { auth, adminEmail, adminUid, database } from '../../lib/firebase';
import type { Booking, BookingStatus } from '../../lib/bookings';
import { AdminInquiries } from './AdminInquiries';
import { AdminProducts } from './AdminProducts';

type BookingFilter = 'all' | BookingStatus;
type AdminSection = 'bookings' | 'products' | 'inquiries';

function getErrorMessage(error: unknown) {
  if (error instanceof Error && 'code' in error && typeof error.code === 'string') {
    switch (error.code) {
      case 'auth/configuration-not-found':
        return 'Firebase Authentication is not configured for this project. In Firebase Console, open Authentication and choose Get started, then enable Email/Password under Sign-in method. Confirm .env.local uses the Web API key and project ID from this same Firebase project.';
      case 'auth/operation-not-allowed':
        return 'Email/password sign-in is disabled. In Firebase Console, open Authentication → Sign-in method and enable Email/Password.';
      case 'auth/unauthorized-domain':
        return 'This website domain is not authorized for Firebase Authentication. In Firebase Console, open Authentication → Settings → Authorized domains and add localhost for local development, or your deployed website domain.';
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Firebase rejected this email and password. Confirm the admin account exists under Firebase Console → Authentication → Users and reset its password there if needed. The Realtime Database admin role does not create or reset Authentication credentials.';
      case 'PERMISSION_DENIED':
        return 'Firebase denied this database request. Publish the current database.rules.json in Firebase Console → Realtime Database → Rules and confirm the configured admin UID is correct.';
      default:
        return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
}

export function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<BookingFilter>('all');
  const [activeSection, setActiveSection] = useState<AdminSection>('bookings');
  const [email, setEmail] = useState(adminEmail);
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [roleSetupWarning, setRoleSetupWarning] = useState('');

  useEffect(() => onAuthStateChanged(
    auth,
    (currentUser) => {
      if (currentUser && (
        currentUser.uid !== adminUid
        || currentUser.email?.trim().toLowerCase() !== adminEmail
      )) {
        setErrorMessage('This account is not authorized to access the admin dashboard.');
        void signOut(auth).catch((error: unknown) => {
          console.error('Unable to sign out unauthorized user:', error);
          setErrorMessage(`Unauthorized account and sign-out failed: ${getErrorMessage(error)}`);
        });
        setUser(null);
      } else {
        setUser(currentUser);
      }
      setIsCheckingAuth(false);
    },
    (error) => {
      console.error('Unable to check Firebase authentication:', error);
      setErrorMessage(`Unable to verify your sign-in: ${getErrorMessage(error)}`);
      setIsCheckingAuth(false);
    },
  ), []);

  useEffect(() => {
    if (!user) {
      setRoleSetupWarning('');
      return;
    }

    let isCurrent = true;
    void set(ref(database, `users/${user.uid}/role`), 'admin')
      .then(() => {
        if (isCurrent) {
          setRoleSetupWarning('');
        }
      })
      .catch((error: unknown) => {
        console.error('Unable to create the admin role record:', error);
        if (isCurrent) {
          setRoleSetupWarning(
            `Signed in successfully, but Firebase could not save the admin role record: ${getErrorMessage(error)}`,
          );
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [user]);

  useEffect(() => {
    if (!user) {
      setBookings([]);
      setIsLoadingBookings(false);
      return;
    }

    setIsLoadingBookings(true);
    const bookingsQuery = query(ref(database, 'bookings'), orderByChild('createdAt'));
    return onValue(
      bookingsQuery,
      (snapshot) => {
        const nextBookings: Booking[] = [];
        snapshot.forEach((bookingSnapshot) => {
          const booking = bookingSnapshot.val();
          nextBookings.push({ ...booking, id: bookingSnapshot.key });
        });
        setBookings(nextBookings.reverse());
        setIsLoadingBookings(false);
      },
      (error) => {
        console.error('Unable to load bookings:', error);
        setErrorMessage(`Unable to load bookings: ${getErrorMessage(error)}`);
        setIsLoadingBookings(false);
      },
    );
  }, [user]);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSigningIn(true);

    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      if (
        credential.user.uid !== adminUid
        || credential.user.email?.trim().toLowerCase() !== adminEmail
      ) {
        await signOut(auth);
        throw new Error('This Firebase account does not match the configured admin email and UID.');
      }

      setPassword('');
    } catch (error) {
      console.error('Admin sign-in failed:', error);
      setErrorMessage(`Sign-in failed: ${getErrorMessage(error)}`);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    setErrorMessage('');
    setIsSigningOut(true);
    try {
      await signOut(auth);
      setUser(null);
      setBookings([]);
      setPassword('');
      setRoleSetupWarning('');
    } catch (error) {
      console.error('Unable to sign out:', error);
      setErrorMessage(`Unable to sign out: ${getErrorMessage(error)}`);
    } finally {
      setIsSigningOut(false);
    }
  };

  const updateBookingStatus = async (id: string, status: BookingStatus) => {
    setErrorMessage('');
    try {
      await update(ref(database, `bookings/${id}`), { status });
    } catch (error) {
      console.error('Unable to update booking status:', error);
      setErrorMessage(`Unable to update booking: ${getErrorMessage(error)}`);
    }
  };

  const filteredBookings = filter === 'all'
    ? bookings
    : bookings.filter((booking) => booking.status === filter);

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background" id="admin">
      <div className="max-w-7xl mx-auto">
        {isCheckingAuth ? (
          <div className="max-w-lg mx-auto bg-card p-8 sm:p-12 rounded-3xl shadow-lg border border-border">
            <p className="text-center text-muted-foreground" role="status">Checking your sign-in…</p>
          </div>
        ) : !user ? (
          <div className="max-w-lg mx-auto bg-card p-8 sm:p-12 rounded-3xl shadow-lg border border-border">
            <div className="text-center mb-8">
              <p className="text-primary uppercase tracking-widest text-sm mb-3">Nishigandha</p>
              <h2 className="text-3xl sm:text-4xl mb-3 text-foreground">Admin Sign In</h2>
              <p className="text-muted-foreground">Sign in to manage appointment bookings.</p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-5">
              <div>
                <label htmlFor="admin-email" className="block mb-2 text-foreground">Admin email</label>
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label htmlFor="admin-password" className="block mb-2 text-foreground">Password</label>
                <input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              {errorMessage && (
                <p className="rounded-xl bg-red-50 p-4 text-red-800" role="alert">{errorMessage}</p>
              )}
              <button
                type="submit"
                disabled={isSigningIn}
                className="w-full bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSigningIn ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
              <div>
                <p className="text-primary uppercase tracking-widest text-sm mb-2">Nishigandha</p>
                <h2 className="text-4xl sm:text-5xl mb-2 text-foreground">
                  {activeSection === 'bookings' ? 'Bookings' : activeSection === 'products' ? 'Products' : 'Inquiries'}
                </h2>
                <p className="text-muted-foreground">
                  {activeSection === 'bookings'
                    ? 'Manage all appointment requests in one place.'
                    : activeSection === 'products'
                      ? 'Manage products shown in your online store.'
                      : 'Respond to customer product questions and requests.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => void handleSignOut()}
                disabled={isSigningOut}
                className="inline-flex items-center justify-center gap-2 self-start sm:self-auto px-5 py-3 rounded-xl border border-border bg-card text-foreground hover:border-primary transition-colors disabled:opacity-50"
              >
                <LogOut className="w-4 h-4" />
                {isSigningOut ? 'Signing out…' : 'Sign out'}
              </button>
            </div>

            {errorMessage && (
              <p className="mb-6 rounded-xl bg-red-50 p-4 text-red-800" role="alert">{errorMessage}</p>
            )}
            {roleSetupWarning && (
              <p className="mb-6 rounded-xl bg-amber-50 p-4 text-amber-900" role="status">{roleSetupWarning}</p>
            )}

            <div className="mb-8 flex flex-wrap gap-3 border-b border-border pb-4" aria-label="Admin sections">
              {([
                ['bookings', 'Bookings'],
                ['products', 'Products'],
                ['inquiries', 'Inquiries'],
              ] as const).map(([section, label]) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => setActiveSection(section)}
                  aria-pressed={activeSection === section}
                  className={`rounded-full px-5 py-2.5 font-medium transition-colors ${
                    activeSection === section
                      ? 'bg-primary text-white'
                      : 'border border-border bg-card text-foreground hover:border-primary'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {activeSection === 'products' ? (
              <AdminProducts />
            ) : activeSection === 'inquiries' ? (
              <AdminInquiries />
            ) : (
              <>
            <div className="mb-8 flex flex-wrap gap-3 justify-center">
              {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFilter(status)}
                  aria-pressed={filter === status}
                  className={`px-6 py-2 rounded-full capitalize transition-all ${
                    filter === status
                      ? 'bg-primary text-white'
                      : 'bg-card text-foreground border border-border hover:border-primary'
                  }`}
                >
                  {status} ({status === 'all' ? bookings.length : bookings.filter((booking) => booking.status === status).length})
                </button>
              ))}
            </div>

            {isLoadingBookings ? (
              <div className="text-center py-12 bg-card rounded-3xl" role="status">
                <p className="text-muted-foreground text-lg">Loading bookings…</p>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-3xl">
                <p className="text-muted-foreground text-lg">No bookings found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBookings.map((booking) => (
                  <article
                    key={booking.id}
                    className="bg-card p-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-border"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        <span className="text-sm capitalize">{booking.status}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <UserIcon className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{booking.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                        <a className="text-foreground hover:text-primary" href={`tel:${booking.phone}`}>{booking.phone}</a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">
                          {new Date(`${booking.date}T00:00:00`).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{booking.time}</span>
                      </div>
                      <div className="pt-2 border-t border-border">
                        <p className="text-sm text-muted-foreground">Service</p>
                        <p className="text-foreground capitalize">{booking.service.replace('-', ' ')}</p>
                      </div>
                    </div>

                    {booking.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => void updateBookingStatus(booking.id, 'confirmed')}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-all"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => void updateBookingStatus(booking.id, 'cancelled')}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
