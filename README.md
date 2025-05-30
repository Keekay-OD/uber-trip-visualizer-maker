# Uber Trip Visualizer Maker

A realistic Uber trip simulator web application perfect for creating YouTube content and educational demonstrations. Simulate authentic Uber experiences with customizable pickup and dropoff locations, complete with distance calculations and travel time estimates.

## 🚗 Features

- **Realistic Trip Simulation**: Create authentic-looking Uber trip scenarios
- **Customizable Locations**: Set any restaurant or location as pickup point and destination as dropoff
- **Distance & Time Calculation**: Automatic calculation of trip distance (km/miles) and estimated travel time
- **YouTube Content Ready**: Perfect for creating engaging video content and tutorials
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS for a polished experience
- **Docker Support**: Easy deployment with Docker configuration included

## 🛠️ Tech Stack

- **Frontend**: Vite + React + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **Package Manager**: npm/bun
- **Containerization**: Docker & Docker Compose

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or bun package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/uber-trip-visualizer-maker.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd uber-trip-visualizer-maker
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
docker-compose up -d
```

### Using Docker directly

```bash
# Build the image
docker build -t uber-trip-visualizer .

# Run the container
docker run -p 5000:5000 uber-trip-visualizer
```

Access the application at `http://localhost:5000`

## 📱 Usage

1. **Set Pickup Location**: Enter a restaurant name or any starting location
2. **Set Destination**: Specify the dropoff address
3. **Configure Trip Details**: The app automatically calculates:
   - Distance (displayed in km or miles)
   - Estimated travel time
   - Trip cost estimation
4. **Generate Simulation**: Create realistic Uber trip scenarios for your content

## 🎥 Perfect for YouTube Content

This simulator is ideal for:
- Educational videos about ride-sharing
- Technology demonstrations
- UI/UX showcases
- Travel and transportation content
- App development tutorials

## 📂 Project Structure

```
uber-trip-visualizer-maker/
├── public/                 # Static assets
├── src/                   # Source code
│   ├── components/        # React components
│   ├── lib/              # Utilities and helpers
│   └── ...
├── .dockerignore         # Docker ignore file
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose setup
└── package.json         # Project dependencies
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

### Development Server

The development server runs with auto-reloading and instant preview, making it easy to iterate and test your trip simulations.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Issues & Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/yourusername/uber-trip-visualizer-maker/issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

## ⭐ Show Your Support

If this project helps you create amazing content, please give it a star! ⭐

---

**Happy simulating!** 🚗💨
