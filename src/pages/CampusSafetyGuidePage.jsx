import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Bookmark, 
  ShieldCheck, 
  Sparkles, 
  Moon, 
  Building, 
  Car, 
  AlertTriangle, 
  Smartphone, 
  Eye
} from 'lucide-react';
import { SAFETY_TIPS } from '../data/mockData';
import { SafetyTipCard } from '../components/SafetyTipCard';
import { useSafety } from '../context/SafetyContext';

const CATEGORIES = [
  { id: 'All', name: 'All Categories' },
  { id: 'Night Safety', name: 'Night Safety', icon: Moon },
  { id: 'Hostel Safety', name: 'Hostel Safety', icon: Building },
  { id: 'Travel Safety', name: 'Travel Safety', icon: Car },
  { id: 'Emergency Preparedness', name: 'Emergency Preparedness', icon: AlertTriangle },
  { id: 'Digital Safety', name: 'Digital Safety', icon: Smartphone },
  { id: 'Personal Awareness', name: 'Personal Awareness', icon: Eye }
];

export const CampusSafetyGuidePage = () => {
  const { favoriteTipIds } = useSafety();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const filteredTips = SAFETY_TIPS.filter((tip) => {
    const matchesCategory = activeCategory === 'All' || tip.category === activeCategory;
    const matchesSearch = 
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBookmark = !showBookmarksOnly || favoriteTipIds.includes(tip.id);

    return matchesCategory && matchesSearch && matchesBookmark;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <BookOpen className="w-5 h-5 text-violet-400" />
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Campus Safety Knowledgebase
          </h1>
        </div>
        <p className="text-sm text-slate-400">
          Proactive protocols, dorm safety rules, late-night walking best practices, and verified university safety guidelines.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search protocols, rideshares, night walks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-900 border border-navy-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 transition-colors"
          />
        </div>

        <button
          onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
            showBookmarksOnly
              ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
              : 'bg-navy-900 text-slate-400 border-navy-800 hover:text-white'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5 fill-current" />
          <span>Saved Favorites ({favoriteTipIds.length})</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-violet-600 to-teal-500 text-white shadow-md shadow-violet-950/40'
                : 'bg-navy-900 text-slate-400 border border-navy-800 hover:bg-navy-850 hover:text-slate-200'
            }`}
          >
            {cat.icon && <cat.icon className="w-3.5 h-3.5" />}
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Guide Cards Grid */}
      {filteredTips.length === 0 ? (
        <div className="text-center p-12 border border-dashed border-navy-800 rounded-2xl bg-navy-900/40">
          <ShieldCheck className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <h3 className="text-base font-bold text-white mb-1">No matching safety tips</h3>
          <p className="text-xs text-slate-400 mb-4">
            Try adjusting your search criteria or resetting filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
              setShowBookmarksOnly(false);
            }}
            className="text-xs text-teal-400 hover:underline font-medium"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => (
            <SafetyTipCard key={tip.id} tip={tip} />
          ))}
        </div>
      )}
    </div>
  );
};

