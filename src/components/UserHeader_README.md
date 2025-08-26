# UserHeader Component

A reusable header component that provides consistent header functionality across all dashboard pages.

## Features

- ✅ **Dynamic User Name**: Shows the actual user's name
- ✅ **Dynamic User Initial**: Profile avatar shows user's first letter (R for Ranith, S for Sai, etc.)
- ✅ **Dark/Light Mode Toggle**: Moon icon with hover effects
- ✅ **Language Selector**: Globe icon with dropdown (English, Arabic, Spanish)
- ✅ **Notification Bell**: Proper bell icon with red badge
- ✅ **Full Screen Toggle**: Enter/exit fullscreen functionality
- ✅ **Profile Dropdown**: Complete dropdown with all options
- ✅ **Mobile Responsive**: Hamburger menu for mobile navigation
- ✅ **Click Outside**: Dropdowns close when clicking outside

## Usage

### Basic Usage

```tsx
import UserHeader from '@/components/UserHeader';

export default function MyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <UserHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        
        {/* Page Content */}
        <div className="flex-1 p-6">
          <h1>My Page Content</h1>
        </div>
      </div>
    </div>
  );
}
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `sidebarOpen` | `boolean` | ✅ | Current state of sidebar (open/closed) |
| `setSidebarOpen` | `(open: boolean) => void` | ✅ | Function to toggle sidebar |
| `darkMode` | `boolean` | ❌ | Current dark mode state (default: true) |
| `setDarkMode` | `(darkMode: boolean) => void` | ❌ | Function to toggle dark mode |

### Example Implementation

The component is already implemented in:
- `src/app/dashboard/DashboardClient.tsx`
- `src/app/dashboard/wallets/WalletsClient.tsx`
- `src/app/dashboard/my-accounts/MyAccountsClient.tsx`
- `src/app/dashboard/new-account/NewAccountClient.tsx`
- `src/app/dashboard/deposit/DepositClient.tsx`
- `src/app/dashboard/transfer/TransferClient.tsx`
- `src/app/dashboard/withdraw/WithdrawClient.tsx`
- `src/app/dashboard/copy-trading/CopyTradingClient.tsx`
- `src/app/dashboard/history/page.tsx`
- `src/app/dashboard/settings/page.tsx`
- `src/app/dashboard/request-master-ib/page.tsx`

### Benefits

1. **DRY Principle**: No code duplication across pages
2. **Consistency**: Same header behavior everywhere
3. **Maintainability**: Update once, applies everywhere
4. **Type Safety**: Full TypeScript support
5. **Reusability**: Easy to add to new pages

### Adding to New Pages

1. Import the component: `import UserHeader from '@/components/UserHeader';`
2. Add required state: `sidebarOpen`, `setSidebarOpen`
3. Add optional state: `darkMode`, `setDarkMode`
4. Place in your layout: `<UserHeader ... />`

That's it! The header will automatically handle all the functionality including user authentication, notifications, and responsive design.
