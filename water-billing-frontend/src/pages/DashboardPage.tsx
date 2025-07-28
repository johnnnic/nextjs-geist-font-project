import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Receipt, 
  CreditCard, 
  TrendingUp,
  Droplets,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const getRoleGreeting = () => {
    switch (user?.role) {
      case 'admin':
        return {
          title: 'Dashboard Administrator',
          description: 'Kelola semua aspek sistem tagihan air',
          stats: [
            { title: 'Total Pelanggan', value: '1,247', icon: Users, color: 'text-blue-400' },
            { title: 'Tagihan Bulan Ini', value: 'Rp 125.4M', icon: Receipt, color: 'text-green-400' },
            { title: 'Pembayaran Hari Ini', value: 'Rp 8.5M', icon: CreditCard, color: 'text-gold' },
            { title: 'Pertumbuhan', value: '+12.5%', icon: TrendingUp, color: 'text-emerald-400' },
          ]
        };
      case 'operator':
        return {
          title: 'Dashboard Operator',
          description: 'Kelola data pelanggan dan pencatatan meteran',
          stats: [
            { title: 'Pelanggan Baru', value: '23', icon: Users, color: 'text-blue-400' },
            { title: 'Meteran Dicatat', value: '156', icon: Droplets, color: 'text-blue-500' },
            { title: 'Pending Verifikasi', value: '12', icon: Clock, color: 'text-yellow-400' },
            { title: 'Selesai Hari Ini', value: '89', icon: CheckCircle, color: 'text-green-400' },
          ]
        };
      case 'kasir':
        return {
          title: 'Dashboard Kasir',
          description: 'Proses pembayaran dan cek tagihan pelanggan',
          stats: [
            { title: 'Pembayaran Hari Ini', value: '67', icon: CreditCard, color: 'text-gold' },
            { title: 'Total Transaksi', value: 'Rp 4.2M', icon: Receipt, color: 'text-green-400' },
            { title: 'Tagihan Tertunda', value: '34', icon: AlertCircle, color: 'text-red-400' },
            { title: 'Rata-rata Tagihan', value: 'Rp 62K', icon: TrendingUp, color: 'text-blue-400' },
          ]
        };
      default:
        return {
          title: 'Dashboard',
          description: 'Selamat datang di sistem tagihan air',
          stats: []
        };
    }
  };

  const { title, description, stats } = getRoleGreeting();

  const recentActivities = [
    { 
      id: 1, 
      action: 'Pembayaran diterima', 
      customer: 'Ahmad Sulaiman', 
      amount: 'Rp 85,000', 
      time: '10 menit yang lalu',
      type: 'payment'
    },
    { 
      id: 2, 
      action: 'Pelanggan baru ditambahkan', 
      customer: 'Siti Nurhaliza', 
      amount: 'ID: 00127', 
      time: '25 menit yang lalu',
      type: 'customer'
    },
    { 
      id: 3, 
      action: 'Tagihan diterbitkan', 
      customer: 'Budi Santoso', 
      amount: 'Rp 92,500', 
      time: '1 jam yang lalu',
      type: 'bill'
    },
    { 
      id: 4, 
      action: 'Meteran dibaca', 
      customer: 'Dewi Kartika', 
      amount: '47 m³', 
      time: '2 jam yang lalu',
      type: 'meter'
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'payment': return <CreditCard className="h-4 w-4 text-gold" />;
      case 'customer': return <Users className="h-4 w-4 text-blue-400" />;
      case 'bill': return <Receipt className="h-4 w-4 text-green-400" />;
      case 'meter': return <Droplets className="h-4 w-4 text-blue-500" />;
      default: return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Selamat datang,</span>
          <span className="font-medium text-gold">{user?.name}</span>
          <span className="px-2 py-1 text-xs bg-gold text-black rounded-md font-medium capitalize">
            {user?.role}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-card/50 backdrop-blur-sm border-brown-medium shadow-soft hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-brown-dark ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-brown-medium shadow-soft">
          <CardHeader>
            <CardTitle className="text-foreground">Aktivitas Terbaru</CardTitle>
            <CardDescription>Kegiatan sistem dalam 24 jam terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg bg-brown-dark/50 border border-brown-medium">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gold">{activity.amount}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-card/50 backdrop-blur-sm border-brown-medium shadow-soft">
          <CardHeader>
            <CardTitle className="text-foreground">Aksi Cepat</CardTitle>
            <CardDescription>Fitur yang sering digunakan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {user?.role === 'admin' && (
                <>
                  <button className="p-4 rounded-lg bg-gradient-gold text-black font-medium hover:shadow-gold transition-all transform hover:scale-105">
                    <Users className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm">Kelola Pelanggan</span>
                  </button>
                  <button className="p-4 rounded-lg bg-brown-dark text-foreground border border-brown-medium hover:bg-brown-medium transition-all">
                    <Receipt className="h-6 w-6 mx-auto mb-2 text-gold" />
                    <span className="text-sm">Buat Tagihan</span>
                  </button>
                  <button className="p-4 rounded-lg bg-brown-dark text-foreground border border-brown-medium hover:bg-brown-medium transition-all">
                    <CreditCard className="h-6 w-6 mx-auto mb-2 text-gold" />
                    <span className="text-sm">Laporan</span>
                  </button>
                  <button className="p-4 rounded-lg bg-brown-dark text-foreground border border-brown-medium hover:bg-brown-medium transition-all">
                    <TrendingUp className="h-6 w-6 mx-auto mb-2 text-gold" />
                    <span className="text-sm">Analisis</span>
                  </button>
                </>
              )}
              
              {user?.role === 'operator' && (
                <>
                  <button className="p-4 rounded-lg bg-gradient-gold text-black font-medium hover:shadow-gold transition-all transform hover:scale-105">
                    <Users className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm">Tambah Pelanggan</span>
                  </button>
                  <button className="p-4 rounded-lg bg-brown-dark text-foreground border border-brown-medium hover:bg-brown-medium transition-all">
                    <Droplets className="h-6 w-6 mx-auto mb-2 text-gold" />
                    <span className="text-sm">Catat Meteran</span>
                  </button>
                </>
              )}
              
              {user?.role === 'kasir' && (
                <>
                  <button className="p-4 rounded-lg bg-gradient-gold text-black font-medium hover:shadow-gold transition-all transform hover:scale-105">
                    <Receipt className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm">Cek Tagihan</span>
                  </button>
                  <button className="p-4 rounded-lg bg-brown-dark text-foreground border border-brown-medium hover:bg-brown-medium transition-all">
                    <CreditCard className="h-6 w-6 mx-auto mb-2 text-gold" />
                    <span className="text-sm">Proses Bayar</span>
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};