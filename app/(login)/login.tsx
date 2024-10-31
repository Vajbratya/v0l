'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { signIn, signUp } from './actions';
import { ActionState } from '@/lib/auth/middleware';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const priceId = searchParams.get('priceId');
  const inviteId = searchParams.get('inviteId');
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === 'signin' ? signIn : signUp,
    { error: '' }
  );
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    crm: '',
    specialty: '',
    phone: ''
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 1: return 'bg-red-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Improved glowing orbs */}
      <motion.div 
        initial={{ opacity: 0.3, scale: 1 }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#7CFFD4]/20 rounded-full filter blur-[100px]"
      />
      
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-soft-light" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#7CFFD4]/10 via-transparent to-orange-500/10 animate-pulse" />
      
      <motion.div 
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          {/* Animated logo */}
          <motion.div 
            className="w-32 h-32 mb-8"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full filter drop-shadow-[0_0_8px_rgba(124,255,212,0.5)]"
            >
              <use href="/LOGOLAUDAI.svg#logo-clip" />
            </svg>
          </motion.div>
          <h2 className="text-center text-5xl font-bold text-white mb-3 tracking-tight">
            {mode === 'signin' ? 'Bem-vindo de volta' : 'Criar conta'}
          </h2>
          <p className="text-center text-gray-400 text-lg max-w-sm">
            {mode === 'signin' 
              ? 'Entre para continuar usando o Laudos.ai'
              : 'Comece a usar o Laudos.ai agora mesmo'}
          </p>
        </div>
      </motion.div>

      <motion.div 
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-black/60 backdrop-blur-xl py-10 px-12 shadow-2xl ring-1 ring-white/10 rounded-3xl relative overflow-hidden group">
          {/* Enhanced animated border gradient */}
          <div className="absolute -inset-px bg-gradient-to-r from-[#7CFFD4]/50 via-orange-500/50 to-[#7CFFD4]/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-[1px] bg-black/90 rounded-3xl z-0" />
          
          <form className="space-y-6 relative z-10" action={formAction}>
            <input type="hidden" name="redirect" value={redirect || ''} />
            <input type="hidden" name="priceId" value={priceId || ''} />
            <input type="hidden" name="inviteId" value={inviteId || ''} />
            
            <AnimatePresence mode="popLayout" initial={false}>
              {mode === 'signup' && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="name" className="block text-sm font-medium text-white/90">
                      Nome Completo
                    </Label>
                    <div className="mt-1 relative group">
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        maxLength={100}
                        value={formData.name}
                        onChange={handleInputChange}
                        className="appearance-none rounded-xl relative block w-full px-3 py-2 bg-black/50 border border-white/10 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-[#7CFFD4]/50 focus:border-[#7CFFD4] transition-all duration-200 focus:scale-[1.02] group-hover:border-[#7CFFD4]/50"
                        placeholder="Dr. João Silva"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7CFFD4]/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Label htmlFor="crm" className="block text-sm font-medium text-white/90">
                      CRM
                    </Label>
                    <div className="mt-1 relative group">
                      <Input
                        id="crm"
                        name="crm"
                        type="text"
                        required
                        maxLength={20}
                        value={formData.crm}
                        onChange={handleInputChange}
                        className="appearance-none rounded-xl relative block w-full px-3 py-2 bg-black/50 border border-white/10 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-[#7CFFD4]/50 focus:border-[#7CFFD4] transition-all duration-200 focus:scale-[1.02] group-hover:border-[#7CFFD4]/50"
                        placeholder="12345-SP"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7CFFD4]/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Label htmlFor="specialty" className="block text-sm font-medium text-white/90">
                      Especialidade
                    </Label>
                    <div className="mt-1 relative group">
                      <select
                        id="specialty"
                        name="specialty"
                        required
                        value={formData.specialty}
                        onChange={handleInputChange}
                        className="appearance-none rounded-xl relative block w-full px-3 py-2 bg-black/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#7CFFD4]/50 focus:border-[#7CFFD4] transition-all duration-200 focus:scale-[1.02] group-hover:border-[#7CFFD4]/50 pr-10"
                      >
                        <option value="" className="bg-black text-white">Selecione uma especialidade</option>
                        <option value="radiologia" className="bg-black text-white">Radiologia</option>
                        <option value="radiologia_intervencionista" className="bg-black text-white">Radiologia Intervencionista</option>
                        <option value="diagnostico_imagem" className="bg-black text-white">Diagnóstico por Imagem</option>
                        <option value="medicina_nuclear" className="bg-black text-white">Medicina Nuclear</option>
                        <option value="outro" className="bg-black text-white">Outro</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 pointer-events-none" />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7CFFD4]/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <Label htmlFor="phone" className="block text-sm font-medium text-white/90">
                      Telefone
                    </Label>
                    <div className="mt-1 relative group">
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        maxLength={20}
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="appearance-none rounded-xl relative block w-full px-3 py-2 bg-black/50 border border-white/10 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-[#7CFFD4]/50 focus:border-[#7CFFD4] transition-all duration-200 focus:scale-[1.02] group-hover:border-[#7CFFD4]/50"
                        placeholder="(11) 99999-9999"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7CFFD4]/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: mode === 'signup' ? 0.4 : 0 }}
            >
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-white/90"
              >
                E-mail
              </Label>
              <div className="mt-1 relative group">
                <Input
                  id="email"
                  name="email"
                  
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={50}
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none rounded-xl relative block w-full px-3 py-2 bg-black/50 border border-white/10 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-[#7CFFD4]/50 focus:border-[#7CFFD4] transition-all duration-200 focus:scale-[1.02] group-hover:border-[#7CFFD4]/50"
                  placeholder="seu@email.com"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7CFFD4]/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: mode === 'signup' ? 0.5 : 0.1 }}
            >
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-white/90"
              >
                Senha
              </Label>
              <div className="mt-1 relative group">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  required
                  minLength={8}
                  maxLength={100}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none rounded-xl relative block w-full px-3 py-2 bg-black/50 border border-white/10 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-[#7CFFD4]/50 focus:border-[#7CFFD4] transition-all duration-200 focus:scale-[1.02] group-hover:border-[#7CFFD4]/50 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  )}
                </button>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7CFFD4]/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
              {mode === 'signup' && (
                <div className="mt-2">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className={`h-2.5 rounded-full ${getPasswordStrengthColor()}`} style={{ width: `${passwordStrength * 25}%` }}></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-400">
                      {passwordStrength === 0 && 'Fraca'}
                      {passwordStrength === 1 && 'Razoável'}
                      {passwordStrength === 2 && 'Média'}
                      {passwordStrength === 3 && 'Forte'}
                      {passwordStrength === 4 && 'Muito forte'}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>

            {state?.error && (
              <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                {state.error}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: mode === 'signup' ? 0.6 : 0.2 }}
            >
              <Button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-[#7CFFD4] to-[#7CFFD4]/80 hover:from-[#7CFFD4]/90 hover:to-[#7CFFD4]/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7CFFD4] transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#7CFFD4]/20"
                disabled={pending || (mode === 'signup' && passwordStrength < 3)}
              >
                {pending ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Carregando...
                  </>
                ) : mode === 'signin' ? (
                  'Entrar'
                ) : (
                  'Criar conta'
                )}
              </Button>
            </motion.div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">
                  {mode === 'signin' ? 'Novo no Laudos.ai?' : 'Já tem uma conta?'}
                </span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: mode === 'signup' ? 0.7 : 0.3 }}
            >
              <Link
                href={`${mode === 'signin' ? '/sign-up' : '/sign-in'}${
                  redirect ? `?redirect=${redirect}` : ''
                }${priceId ? `&priceId=${priceId}` : ''}`}
                className="w-full flex justify-center py-3 px-4 border border-[#7CFFD4]/20 rounded-xl text-sm font-medium text-white bg-[#7CFFD4]/5 hover:bg-[#7CFFD4]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7CFFD4] transition-all duration-200 hover:scale-[1.02] group relative overflow-hidden"
              >
                <span className="relative z-10">
                  {mode === 'signin' ? 'Criar uma nova conta' : 'Entrar com conta existente'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#7CFFD4]/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </Link>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}