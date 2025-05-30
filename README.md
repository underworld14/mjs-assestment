# User Management System

A modern, responsive CRUD interface for managing users and their addresses, built with Next.js App Router, Drizzle ORM, and PostgreSQL.

![Tech Stack](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql)

## 🎯 Overview

This application provides a fully responsive, mobile-first user management interface with complete CRUD (Create, Read, Update, Delete) operations. Users can manage personal information including names, birth dates, and addresses through an intuitive interface that adapts seamlessly from mobile to desktop.

### ✨ Key Features

- **📱 Mobile-First Design**: Responsive interface with card layouts for mobile and table layouts for desktop
- **🎨 Modern UI**: Built with ShadCN UI components and Tailwind CSS
- **🔐 Type Safety**: Full TypeScript implementation with Zod validation
- **💾 Database Integration**: PostgreSQL with Drizzle ORM for type-safe queries
- **⚡ Performance**: Server Components with optimistic loading states
- **🔄 Real-time Updates**: Automatic revalidation after data mutations
- **✅ Form Validation**: Client and server-side validation with error handling
- **🎭 Interactive Feedback**: Toast notifications for user actions

### 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4, ShadCN UI, Radix UI primitives
- **Backend**: Next.js Server Actions, Drizzle ORM
- **Database**: PostgreSQL (Docker)
- **Validation**: Zod schemas
- **Forms**: React Hook Form with Zod resolver
- **Notifications**: Sonner toast library
- **Package Manager**: pnpm

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.0.0 or later)
- [pnpm](https://pnpm.io/) (recommended) or npm/yarn
- [Docker](https://www.docker.com/) and Docker Compose
- [Git](https://git-scm.com/)

### 📥 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mjs-assestment
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Update the `.env.local` file with your database configuration:

   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/userdb"
   ```

### 🐳 Database Setup

1. **Start PostgreSQL with Docker**

   ```bash
   docker-compose up -d
   ```

2. **Push database schema**

   ```bash
   pnpm db:push
   ```

3. **Seed the database with sample data**
   ```bash
   pnpm db:seed
   ```

### 🏃‍♂️ Running the Application

1. **Start the development server**

   ```bash
   pnpm dev
   ```

2. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📝 Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm db:generate` - Generate Drizzle schema
- `pnpm db:push` - Push schema changes to database
- `pnpm db:studio` - Open Drizzle Studio (database GUI)
- `pnpm db:seed` - Seed database with sample data

## 🎨 User Interface

### Mobile Experience

- **Card Layout**: Easy-to-read user cards with touch-friendly interactions
- **Responsive Forms**: Full-width forms optimized for mobile input
- **Bottom Sheet Dialogs**: Native-feeling modal interactions

### Desktop Experience

- **Table Layout**: Comprehensive data table with sortable columns
- **Modal Dialogs**: Centered dialogs for form operations
- **Hover States**: Interactive feedback for better UX

## 🗂 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage with user management
│   ├── users/             # User-related pages
│   └── layout.tsx         # Root layout with Toaster
├── components/
│   ├── ui/                # ShadCN UI components
│   └── users/             # User-specific components
│       ├── user-table.tsx # Main user interface
│       ├── user-form.tsx  # Create/edit form
│       ├── user-dialog.tsx # Modal wrapper
│       └── delete-user-dialog.tsx # Delete confirmation
├── lib/
│   ├── actions/           # Server actions
│   ├── validations/       # Zod schemas
│   ├── types.ts          # TypeScript interfaces
│   └── utils.ts          # Utility functions
└── db/
    ├── schema.ts         # Database schema
    ├── index.ts          # Database connection
    └── seed.ts           # Seed data
```

## 🔧 Database Schema

The application uses a simple but effective schema:

```sql
-- Users table
users (
  id: serial (Primary Key)
  firstname: varchar(255)
  lastname: varchar(255)
  birthdate: date
)

-- Addresses table (one-to-one with users)
addresses (
  id: serial (Primary Key)
  user_id: integer (Foreign Key, Unique)
  street: varchar(255)
  city: varchar(100)
  province: varchar(100)
  postal_code: varchar(20)
)
```

## 🎯 Features Overview

### User Management

- **Create Users**: Add new users with personal and address information
- **View Users**: Responsive display of all users with their details
- **Edit Users**: Update existing user information
- **Delete Users**: Remove users with confirmation dialog

### Form Validation

- **Client-side**: Real-time validation with React Hook Form
- **Server-side**: Zod schema validation for data integrity
- **Error Handling**: User-friendly error messages and toast notifications

### Responsive Design

- **Mobile-first**: Optimized for mobile devices with progressive enhancement
- **Breakpoints**: Smooth transitions between mobile, tablet, and desktop layouts
- **Touch-friendly**: Appropriate sizing and spacing for touch interactions

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart the database
docker-compose restart

# View database logs
docker-compose logs postgres
```

### Development Server Issues

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
pnpm install
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [ShadCN UI](https://ui.shadcn.com/) - Beautiful and accessible UI components
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM for SQL databases
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
