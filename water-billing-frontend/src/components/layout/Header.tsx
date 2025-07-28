import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Header: React.FC = () => {
  const { user } = useAuth();

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'operator': return 'Operator';
      case 'kasir': return 'Kasir';
      default: return role;
    }
  };

  return (
    <header className="h-16 border-b border-brown-medium bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-foreground hover:text-gold" />
          
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari pelanggan, tagihan..."
                className="pl-10 w-80 bg-background border-brown-medium focus:border-gold"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-muted-foreground" />
          </Button>

          <div className="flex items-center gap-3 px-3 py-2 bg-brown-dark rounded-lg border border-brown-medium">
            <div className="w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center">
              <span className="text-black font-semibold text-sm">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-foreground">{user?.name}</p>
              <p className="text-xs text-gold">{getRoleDisplayName(user?.role || '')}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};