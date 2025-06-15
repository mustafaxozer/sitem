import React, { useState } from 'react';
import { MessageCircle, Users, Search, Plus, Filter, Star, TrendingUp } from 'lucide-react';

interface Community {
  id: number;
  name: string;
  description: string;
  members: number;
  category: string;
  price: number;
  type: 'sale' | 'buy';
  contact: string;
  featured: boolean;
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'sale' | 'buy'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [communities, setCommunities] = useState<Community[]>([
    {
      id: 1,
      name: "Kripto Para Türkiye",
      description: "Aktif kripto para topluluğu, günlük analizler ve tartışmalar",
      members: 15420,
      category: "Kripto",
      price: 2500,
      type: 'sale',
      contact: "@kriptoturk",
      featured: true
    },
    {
      id: 2,
      name: "Teknoloji Haberleri",
      description: "Son teknoloji haberleri ve incelemeler",
      members: 8750,
      category: "Teknoloji",
      price: 1200,
      type: 'sale',
      contact: "@techtr",
      featured: false
    },
    {
      id: 3,
      name: "Oyun Topluluğu Arıyorum",
      description: "Aktif oyuncu topluluğu satın almak istiyorum",
      members: 0,
      category: "Oyun",
      price: 800,
      type: 'buy',
      contact: "@gamebuyer",
      featured: false
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    members: '',
    category: '',
    price: '',
    type: 'sale' as 'sale' | 'buy',
    contact: ''
  });

  const filteredCommunities = communities.filter(community => {
    const matchesFilter = filter === 'all' || community.type === filter;
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCommunity: Community = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      members: parseInt(formData.members) || 0,
      category: formData.category,
      price: parseInt(formData.price),
      type: formData.type,
      contact: formData.contact,
      featured: false
    };
    
    setCommunities([newCommunity, ...communities]);
    setFormData({
      name: '',
      description: '',
      members: '',
      category: '',
      price: '',
      type: 'sale',
      contact: ''
    });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">TelegramMarket</h1>
                <p className="text-sm text-gray-600 hidden sm:block">Topluluk Alım-Satım Platformu</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-2 sm:px-6 sm:py-2.5 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-4 w-4" />
              <span className="font-medium text-sm sm:text-base">İlan Ver</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Telegram Topluluklarını 
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"> Alın & Satın</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Kaliteli Telegram toplulukları için güvenilir alım-satım platformu
          </p>
        </div>

        {/* İlan Verme Formu */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Yeni İlan Ver</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Topluluk Adı
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Topluluk adını girin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kategori
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="ör: Kripto, Teknoloji, Oyun"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Açıklama
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Topluluk hakkında detaylı bilgi verin"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Üye Sayısı
                  </label>
                  <input
                    type="number"
                    value={formData.members}
                    onChange={(e) => setFormData({...formData, members: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={formData.type === 'buy' ? "0 (istenen)" : "Mevcut üye sayısı"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fiyat (TL)
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Fiyat girin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    İlan Türü
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as 'sale' | 'buy'})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="sale">Satılık</option>
                    <option value="buy">Alıcı</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  İletişim (Telegram)
                </label>
                <input
                  type="text"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="@kullaniciadi"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
                >
                  İlanı Yayınla
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filtreler */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-500" />
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === 'all'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Tümü
                </button>
                <button
                  onClick={() => setFilter('sale')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === 'sale'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Satılık
                </button>
                <button
                  onClick={() => setFilter('buy')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === 'buy'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Alıcı
                </button>
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Topluluk ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-full sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* İlanlar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => (
            <div
              key={community.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {community.name}
                      </h3>
                      {community.featured && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-semibold rounded-full">
                      {community.category}
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    community.type === 'sale'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {community.type === 'sale' ? 'Satılık' : 'Alıcı'}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {community.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  {community.type === 'sale' && community.members > 0 && (
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Users className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {community.members.toLocaleString('tr-TR')} üye
                      </span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1 text-gray-700">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-lg font-bold">
                      {community.price.toLocaleString('tr-TR')} ₺
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => window.open(`https://t.me/${community.contact.replace('@', '')}`, '_blank')}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>İletişime Geç</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCommunities.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                İlan bulunamadı
              </h3>
              <p className="text-gray-600">
                Aradığınız kriterlere uygun ilan mevcut değil.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">TelegramMarket</span>
            </div>
            <p className="text-gray-600 mb-4">
              Güvenilir Telegram topluluk alım-satım platformu
            </p>
            <p className="text-sm text-gray-500">
              © 2024 TelegramMarket. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;