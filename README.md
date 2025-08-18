# RAZ CAPITALS - Trading Platform

A modern, responsive trading platform built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional UI with dark green theme
- **Responsive Layout**: Mobile-first design that works on all devices
- **Real-time Data**: Live market data and portfolio tracking
- **Advanced Analytics**: Comprehensive trading analytics and insights
- **Mobile Trading**: Full-featured mobile app interface
- **Secure Trading**: Bank-grade security and encryption
- **Multiple Plans**: Starter, Professional, and Enterprise pricing tiers

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons (SVG)
- **Fonts**: Inter (Google Fonts)
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
raz-capitals/
├── public/                      # Static assets
│   ├── images/                  # Images and icons
│   └── favicon.ico             # Site favicon
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── features/           # Features page
│   │   ├── pricing/            # Pricing page
│   │   ├── contact/            # Contact page
│   │   ├── dashboard/          # Dashboard (future)
│   │   └── api/                # API routes
│   ├── components/             # Reusable components
│   ├── styles/                 # Global styles
│   ├── constants/              # Static data
│   ├── types/                  # TypeScript types
│   ├── utils/                  # Utility functions
│   └── hooks/                  # Custom React hooks
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd raz-capitals
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Pages

### Home Page (`/`)
- Hero section with call-to-action
- Feature highlights
- Portfolio management showcase
- Analytics and insights
- Market choice and speed features
- Trading accounts/pricing

### Features Page (`/features`)
- Detailed feature descriptions
- Advanced trading tools
- Mobile trading capabilities
- API access information
- Customer support details

### Pricing Page (`/pricing`)
- Three pricing tiers (Starter, Professional, Enterprise)
- Feature comparison
- FAQ section
- Call-to-action

### Contact Page (`/contact`)
- Contact form with validation
- Contact information
- Business hours
- FAQ section

### Dashboard (`/dashboard`) - Future
- Portfolio overview
- Recent trades
- Account summary
- Quick actions
- Market watch

## 🎨 Design System

### Colors
- **Primary Green**: `#22c55e` (Green-500)
- **Dark Green**: `#14532d` (Green-900)
- **Light Background**: `#fafafa`
- **Text Dark**: `#1e293b`
- **Text Light**: `#64748b`

### Typography
- **Font Family**: Inter
- **Weights**: 300, 400, 500, 600, 700, 800, 900

### Components
- Responsive navigation
- Hero sections with gradients
- Feature cards
- Pricing tables
- Contact forms
- Mobile mockups
- Charts and analytics

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS with custom configuration for colors, fonts, and spacing.

### TypeScript
Strict TypeScript configuration with path aliases for clean imports.

### Next.js
Optimized for Next.js 14 with App Router and server components.

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
# or
yarn build
```

### Start Production Server
```bash
npm start
# or
yarn start
```

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@goldtrade.com or visit our contact page.

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Real-time trading functionality
- [ ] Advanced charting with TradingView integration
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Advanced portfolio analytics
- [ ] Social trading features
- [ ] Educational content and tutorials

---

Built with ❤️ by the RAZ CAPITALS team 