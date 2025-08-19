# BEAM BAND Dashboard System

## 🎯 Overview

The BEAM BAND Dashboard is a comprehensive participant management system built with Next.js, Supabase, and Tailwind CSS. It provides city-specific dashboards for participants to manage events, fundraising, governance, and their profiles.

## ✨ Features

### 🔐 Authentication & Security
- **Supabase Auth Integration**: Secure user authentication and session management
- **Governance Agreement Required**: Users must agree to community principles before accessing dashboard
- **City-Specific Access**: Dashboard access is restricted to the user's assigned city

### 🏙️ City-Specific Dashboards
- **Dynamic Routing**: `/dashboard/[citySlug]` - supports all 9 BEAM BAND cities
- **Localized Content**: Events, fundraising, and governance specific to each city
- **Responsive Design**: Mobile-first design with Tailwind CSS

### 📱 Dashboard Sections

#### 1. **Main Dashboard** (`/dashboard/[citySlug]`)
- Overview statistics and progress tracking
- Quick access to upcoming events and active campaigns
- Fundraising progress visualization
- City-specific information display

#### 2. **Events** (`/dashboard/[citySlug]/events`)
- Browse and search upcoming events
- Filter by status (upcoming, ongoing, completed)
- Event details with venue, date, and ticket information
- Responsive grid layout with search functionality

#### 3. **Fundraising** (`/dashboard/[citySlug]/fundraising`)
- View active fundraising campaigns
- Track progress towards city goals
- Donation history and campaign details
- Progress bars and statistics

#### 4. **Governance** (`/dashboard/[citySlug]/governance`)
- Community voting on proposals
- Governance document library
- Active votes with Yes/No/Abstain options
- Document types: Constitution, Bylaws, Policies, Guidelines

#### 5. **Profile** (`/dashboard/[citySlug]/profile`)
- User profile management
- Activity history tracking
- Editable personal information
- Community participation metrics

### 🚀 Slack Integration

#### **Features**
- **Join Slack Button**: Prominent button in dashboard header
- **City-Specific Channels**: Automatic linking to city Slack channels
- **Real-time Communication**: Seamless integration with community discussions

#### **Implementation**
- Static Slack invite links for each city
- Configurable through environment variables
- Ready for future bot integration

## 🛠️ Technical Stack

### **Frontend**
- **Next.js 14**: App Router with dynamic routing
- **TypeScript**: Full type safety and IntelliSense
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful, customizable icons

### **Backend & Database**
- **Supabase**: PostgreSQL database with real-time capabilities
- **Row Level Security**: Data isolation between cities
- **Authentication**: Built-in user management
- **Real-time Subscriptions**: Live updates for collaborative features

### **State Management**
- **React Hooks**: Local state management
- **Supabase Client**: Direct database operations
- **Context API**: Ready for global state if needed

## 📁 Project Structure

```
app/
├── dashboard/
│   └── [citySlug]/
│       ├── page.tsx              # Main dashboard
│       ├── onboarding/           # Governance agreement
│       ├── events/               # Events management
│       ├── fundraising/          # Fundraising campaigns
│       ├── governance/           # Community governance
│       └── profile/              # User profile
├── city/
│   └── [slug]/
│       └── page.tsx              # City landing pages
└── page.tsx                      # Home page

components/
├── DashboardLayout.tsx           # Dashboard layout wrapper
├── CityGrid.tsx                  # City selection grid
├── EventCard.tsx                 # Event display component
└── ...                          # Other components

lib/
├── supabase.ts                   # Supabase client & types
└── stripe.ts                     # Stripe integration
```

## 🚀 Getting Started

### **1. Environment Setup**

Copy `env.example` to `.env.local` and configure:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Slack (Optional)
NEXT_PUBLIC_SLACK_WORKSPACE_URL=https://your-workspace.slack.com
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_SIGNING_SECRET=your-signing-secret
```

### **2. Database Setup**

Create the following tables in Supabase:

#### **Users Table**
```sql
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  city_id TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **Governance Table**
```sql
CREATE TABLE governance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  city_id TEXT NOT NULL,
  agreement BOOLEAN DEFAULT FALSE,
  agreed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **Fundraising Table**
```sql
CREATE TABLE fundraising (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  city_id TEXT NOT NULL,
  user_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  amount DECIMAL(10,2) DEFAULT 0,
  goal DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'active',
  end_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **3. Install Dependencies**

```bash
npm install
# or
yarn install
```

### **4. Run Development Server**

```bash
npm run dev
# or
yarn dev
```

## 🔧 Configuration

### **Slack Integration**

1. **Create Slack App**: Go to [api.slack.com/apps](https://api.slack.com/apps)
2. **Configure OAuth Scopes**: Add `channels:read`, `chat:write` permissions
3. **Install App**: Add to your workspace
4. **Get Tokens**: Copy Bot User OAuth Token and Signing Secret
5. **Update Environment**: Add tokens to `.env.local`

### **City Configuration**

Each city needs:
- **Slug**: URL-friendly identifier (e.g., `orlando`, `atlanta`)
- **Slack Channel**: Dedicated channel for city communications
- **Invite Link**: Public invite link for the city's Slack channel

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: `< 768px` - Single column, collapsible sidebar
- **Tablet**: `768px - 1024px` - Two column layout
- **Desktop**: `> 1024px` - Full sidebar with expanded content

### **Mobile Features**
- **Hamburger Menu**: Collapsible sidebar navigation
- **Touch-Friendly**: Large touch targets and swipe gestures
- **Optimized Layout**: Stacked cards and full-width content

## 🎨 Customization

### **Theming**
- **Color Scheme**: Easily customizable through Tailwind config
- **Component Variants**: Consistent design system across all pages
- **Dark Mode**: Ready for future dark theme implementation

### **Branding**
- **Logo Integration**: Replace placeholder with BEAM BAND branding
- **Color Palette**: Update primary/secondary colors in Tailwind config
- **Typography**: Custom font families and sizing

## 🔒 Security Features

### **Data Protection**
- **Row Level Security**: City data isolation
- **User Authentication**: Required for all dashboard access
- **Input Validation**: Form validation and sanitization
- **CSRF Protection**: Built-in Next.js security features

### **Access Control**
- **City Restrictions**: Users can only access their assigned city
- **Governance Agreement**: Required before dashboard access
- **Session Management**: Secure authentication flow

## 🚀 Deployment

### **Vercel (Recommended)**
1. **Connect Repository**: Link your GitHub repository
2. **Environment Variables**: Add all required environment variables
3. **Deploy**: Automatic deployment on push to main branch

### **Other Platforms**
- **Netlify**: Static export with API routes
- **Railway**: Full-stack deployment
- **DigitalOcean**: App Platform deployment

## 🔮 Future Enhancements

### **Planned Features**
- **Real-time Chat**: Integrated chat within dashboard
- **Push Notifications**: Event reminders and updates
- **Advanced Analytics**: Detailed participation metrics
- **Mobile App**: React Native companion app

### **Integration Opportunities**
- **Discord**: Alternative communication platform
- **Zoom/Teams**: Video meeting integration
- **Payment Processing**: Direct donation handling
- **Social Media**: Content sharing and promotion

## 📞 Support

### **Documentation**
- **API Reference**: Supabase documentation
- **Component Library**: Storybook integration (planned)
- **Design System**: Figma design files (available)

### **Community**
- **GitHub Issues**: Bug reports and feature requests
- **Discord Server**: Community support and discussions
- **Email Support**: Direct support for enterprise users

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for the BEAM BAND community**
