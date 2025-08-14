# BEAM Band Site

A comprehensive web platform for the BEAM Band movement across multiple cities, featuring event listings, fundraising goal tracking, city-specific pages, and community engagement tools.

## 🎵 Features

### Core Functionality
- **Multi-City Support**: Dedicated pages for 9 cities (Orlando, Nashville, Atlanta, Augusta, Knoxville, Tampa, Jackson, Virginia, Los Angeles)
- **Event Management**: Concert listings with booking capabilities
- **Fundraising Tracker**: Real-time progress tracking with milestone achievements
- **Donation System**: Integrated Stripe payments for secure donations
- **Community Benefits**: Milestone-based community improvements
- **Leaderboard**: Top supporters and donors recognition

### Technical Features
- **Mobile-First Design**: Responsive design optimized for all devices
- **Modern UI/UX**: Beautiful animations and smooth interactions
- **Real-time Updates**: Live fundraising progress and milestone tracking
- **Secure Payments**: Stripe integration for donation processing
- **Database Backend**: Supabase integration for data management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd beam-band-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Database Setup**
   Set up your Supabase database with the following tables:
   - `cities` - City information and fundraising goals
   - `events` - Event listings and details
   - `donations` - Donation records and tracking
   - `coordinators` - City coordinator information
   - `milestones` - Fundraising milestones and benefits

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
beam-band-site/
├── app/                    # Next.js 13+ app directory
│   ├── api/               # API routes
│   ├── city/[slug]/       # Dynamic city pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation and city selector
│   ├── Hero.tsx           # Homepage hero section
│   ├── CityGrid.tsx       # City selection grid
│   ├── EventCard.tsx      # Individual event display
│   ├── DonationForm.tsx   # Donation form with Stripe
│   ├── Leaderboard.tsx    # Top supporters display
│   └── MilestoneTracker.tsx # Fundraising milestones
├── lib/                   # Utility libraries
│   ├── supabase.ts        # Supabase client and types
│   └── stripe.ts          # Stripe configuration
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Primary**: BEAM Orange (`#f27515`)
- **Secondary**: City-specific colors for each location
- **Accent**: Supporting colors for UI elements

### Typography
- **Headings**: Poppins (Display)
- **Body**: Inter (Sans-serif)

### Components
- **Cards**: Consistent card design with shadows and borders
- **Buttons**: Primary and secondary button styles
- **Forms**: Clean input fields with focus states
- **Animations**: Framer Motion for smooth interactions

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Set up the database tables (see Database Schema below)
3. Configure Row Level Security (RLS) policies
4. Add your Supabase URL and anon key to environment variables

### Stripe Setup
1. Create a Stripe account
2. Get your publishable and secret keys
3. Configure webhook endpoints for payment confirmation
4. Add keys to environment variables

## 📊 Database Schema

### Cities Table
```sql
CREATE TABLE cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  state TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  fundraising_goal DECIMAL(10,2) NOT NULL,
  current_amount DECIMAL(10,2) DEFAULT 0,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Events Table
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID REFERENCES cities(id),
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  venue TEXT NOT NULL,
  address TEXT NOT NULL,
  ticket_price DECIMAL(8,2) NOT NULL,
  image_url TEXT,
  status TEXT DEFAULT 'upcoming',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Donations Table
```sql
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID REFERENCES cities(id),
  donor_name TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  message TEXT,
  anonymous BOOLEAN DEFAULT FALSE,
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Build command: `npm run build`, Publish directory: `.next`
- **AWS Amplify**: Follow Next.js deployment guide
- **Self-hosted**: Build with `npm run build` and serve with `npm start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation and FAQ

## 🔮 Roadmap

### Phase 2
- [ ] User authentication and profiles
- [ ] Event ticketing system
- [ ] Merchandise shop
- [ ] Music sample integration
- [ ] Social media integration

### Phase 3
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Advanced fundraising tools
- [ ] Community forum

---

**Built with ❤️ for the BEAM Band community**
