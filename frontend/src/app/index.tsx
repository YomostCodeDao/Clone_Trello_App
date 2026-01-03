// frontend/src/app/index.tsx
import { RouterProvider } from "./providers";
import { AppRouter } from "./router";

function App() {
    // ✅ Test render
    console.log('🚀 App component rendered');
    
    return (
        <RouterProvider>
            <AppRouter />
        </RouterProvider>
    )
}

export default App;