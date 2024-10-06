import FormPage from '@/pages/form';
import NotFound from '@/pages/not-found';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const MemberPage = lazy(() => import('@/pages/members'));
const MemberDetailPage = lazy(() => import('@/pages/members/MemberDetailPage'));
const ProposalsPage = lazy(() => import('@/pages/proposals'));
const ProposalDetailPage = lazy(
  () => import('@/pages/proposals/ProposalDetailPage')
);
const SettingsPage = lazy(() => import('@/pages/settings'));

// ----------------------------------------------------------------------

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true
        },
        {
          path: 'member',
          element: <MemberPage />
        },
        {
          path: 'member/details',
          element: <MemberDetailPage />
        },
        {
          path: 'proposal',
          element: <ProposalsPage />
        },
        {
          path: 'proposal/details',
          element: <ProposalDetailPage />
        },
        {
          path: 'settings',
          element: <SettingsPage />
        },
        {
          path: 'form',
          element: <FormPage />
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/login',
      element: <SignInPage />,
      index: true
    },
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
