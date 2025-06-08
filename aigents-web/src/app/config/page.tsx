import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


export default function ConfigPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-6">
        <h1 
          className="text-6xl font-bold bg-gradient-to-r from-[#C75AF6] via-[#F55AFC] to-[#C75AF6] bg-clip-text text-transparent"
          style={{
            textShadow: '0 0 20px rgba(199, 90, 246, 0.5), 0 0 40px rgba(245, 90, 252, 0.3)'
          }}
        >
          Página de Configuración
        </h1>
        
        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#C75AF6] to-[#F55AFC] rounded-full shadow-lg shadow-purple-500/50"></div>
        
        <p className="mt-8 text-xl text-[#F4E48C] font-medium max-w-2xl leading-relaxed">
          Aquí es donde configurarás tu agente de prueba.
        </p>
        
        <div className="mt-12 p-8 rounded-2xl border border-[#C75AF6]/20 bg-gradient-to-br from-[#091442]/50 to-[#091442]/30 backdrop-blur-sm shadow-2xl shadow-purple-500/10">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-3 h-3 rounded-full bg-[#C75AF6] animate-pulse shadow-lg shadow-purple-500/50"></div>
            <span className="text-[#F4E48C] font-semibold">Configuración en desarrollo</span>
            <div className="w-3 h-3 rounded-full bg-[#F55AFC] animate-pulse shadow-lg shadow-pink-500/50"></div>
          </div>
        </div>
      </div>
      <Alert className="mt-8 text-left max-w-lg mx-auto border-purple-500 bg-purple-900/20 text-white">
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You are about to configure your agent. Please proceed with caution.
          </AlertDescription>
        </Alert>
    </main>
  );
} 