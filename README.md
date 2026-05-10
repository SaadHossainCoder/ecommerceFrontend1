# Artisan E-Commerce Platform - Frontend

A modern, high-end, and feature-rich frontend for an artisanal e-commerce platform. Built with Next.js 16, Tailwind CSS v4, and Shadcn UI, this platform emphasizes premium aesthetics, fluid animations, and a seamless user experience.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Charts**: [Recharts](https://recharts.org/)

## ✨ Key Features

- **Dynamic Artist & Vendor Profiles**: Detailed showcase pages mapping artists to their exclusive product catalogs dynamically.
- **Premium Checkout Experience**: Multi-step, secure checkout workflow with saved address management, guest/gift options, and dynamic shipping methods.
- **Advanced State Management**: Efficient management of Cart, Address, and User state using Zustand.
- **Editorial-Style Legal Pages**: High-end, card-based layout designs for policies (Return & Refund, Privacy & Security) focused on scannability, interactive navigation, and professional branding.
- **Admin Management Tools**: Robust management features for products, including toggle capabilities for disabled/hidden products in the administrative dashboard.
- **Intuitive Form Validation**: Clear error handling and intuitive feedback loops using React Hook Form and Zod validation schemas.

## 📦 Getting Started

### Prerequisites

Ensure you have Node.js and `npm` installed on your machine.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <repository-url>
   cd ecommersce-frontend2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory and configure your necessary environment variables, primarily mapping to your backend API server.

### Running the Development Server

Start the application in development mode:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The application will hot-reload as you make modifications.

## 📂 Project Structure

- `src/app/`: Next.js App Router (Pages, Layouts, Loading states, Error boundaries).
- `src/components/`: Reusable UI components (including base Shadcn UI components).
- `src/services/`: API integration layers using Axios (e.g., Product, Vendor, Address services).
- `src/store/`: Zustand state management stores handling global application data.
- `src/lib/`: Shared utility functions, Axios base instances, and configuration helpers.

## 🛡️ Security & Integrations

- Protected routes and authenticated user flows.
- Backend integrations with Arcjet for rate limiting and bot protection, backed by Redis for high-performance caching.
