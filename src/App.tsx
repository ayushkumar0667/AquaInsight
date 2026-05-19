/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BarChart, Cloud, Droplet, Moon, Sun, PlusCircle, ChevronDown, MapPin, CloudRain, ClipboardCheck, Calculator, AlertTriangle, CheckCircle2, ArrowRight, Search, Loader2, XCircle, TrendingUp, Info } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps';

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

function RippleBackground() {
  const [ripples, setRipples] = useState<{ id: number; top: number; left: number }[]>([]);

  useEffect(() => {
    const createRipple = () => {
      const newRipple = {
        id: Date.now() + Math.random(),
        top: 50 + (Math.random() * 20 - 10),
        left: 50 + (Math.random() * 20 - 10),
      };
      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 10000);
    };

    createRipple();
    const t1 = setTimeout(createRipple, 3300);
    const t2 = setTimeout(createRipple, 6600);
    const interval = setInterval(createRipple, 3300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-gradient-to-b from-surface-container-low to-background">
      {ripples.map((r) => (
        <div
          key={r.id}
          className="absolute rounded-full border border-primary/10 -translate-x-1/2 -translate-y-1/2 ripple-anim"
          style={{
            top: `${r.top}%`,
            left: `${r.left}%`,
          }}
        />
      ))}
    </div>
  );
}

function Home() {
  return (
    <>
      <RippleBackground />
      <div className="max-w-max-width mx-auto px-gutter text-center relative z-10 mb-16">
        <h1 className="font-display-lg text-display-lg text-primary mb-4 hidden md:block">
          AquaInsight
        </h1>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-4 md:hidden">
          AquaInsight
        </h1>
        <p className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto">
          Know Your Water. Grow Your Future.
        </p>
      </div>

      <div className="max-w-max-width mx-auto px-gutter relative z-10 w-full h-full flex-grow">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 relative h-auto md:h-full min-h-[400px]">
          {/* Usage Tracker Bubble */}
          <Link
            to="/usage"
            className="bg-surface-white/80 backdrop-blur-lg rounded-full w-72 h-72 flex flex-col items-center justify-center border border-primary-fixed-dim text-center p-6 shadow-[0px_4px_20px_rgba(26,111,160,0.08)] hover:-translate-y-1 hover:shadow-[0px_8px_30px_rgba(26,111,160,0.15)] transition-all duration-300 relative z-30 md:z-30 cursor-pointer"
          >
            <BarChart size={56} className="text-primary mb-4" strokeWidth={1.5} />
            <h2 className="font-headline-md text-headline-md text-primary mb-2">
              Usage Tracker
            </h2>
            <p className="font-caption text-caption text-secondary">
              Monitor consumption daily.
            </p>
          </Link>

          {/* Water Quality Bubble */}
          <Link
            to="/water-quality"
            className="bg-surface-white/80 backdrop-blur-lg rounded-full w-64 h-64 flex flex-col items-center justify-center border border-primary-fixed-dim text-center p-6 shadow-[0px_4px_20px_rgba(26,111,160,0.08)] hover:-translate-y-1 hover:shadow-[0px_8px_30px_rgba(26,111,160,0.15)] transition-all duration-300 relative md:absolute md:top-1/2 md:left-[5%] lg:left-[15%] xl:left-[20%] md:-translate-y-1/2 z-20 cursor-pointer"
            >
            <Droplet size={48} className="text-tertiary-container mb-4" strokeWidth={1.5} />
            <h2 className="font-headline-md text-headline-md text-primary mb-2">
              Water Quality
            </h2>
            <p className="font-caption text-caption text-secondary">
              Real-time purity metrics.
            </p>
          </Link>

          {/* Harvesting Bubble */}
          <Link
            to="/harvesting"
            className="bg-surface-white/80 backdrop-blur-lg rounded-full w-64 h-64 flex flex-col items-center justify-center border border-primary-fixed-dim text-center p-6 shadow-[0px_4px_20px_rgba(26,111,160,0.08)] hover:-translate-y-1 hover:shadow-[0px_8px_30px_rgba(26,111,160,0.15)] transition-all duration-300 relative md:absolute md:top-1/2 md:right-[5%] lg:right-[15%] xl:right-[20%] md:-translate-y-1/2 z-20 cursor-pointer"
            >
            <Cloud size={48} className="text-tertiary mb-4" strokeWidth={1.5} />
            <h2 className="font-headline-md text-headline-md text-primary mb-2">
              Harvesting
            </h2>
            <p className="font-caption text-caption text-secondary">
              Optimize rainwater capture.
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}

function PageContent({ title, text, icon: Icon }: { title: string; text: string; icon: any }) {
  return (
    <div className="max-w-4xl mx-auto w-full px-gutter relative z-10 flex flex-col items-center justify-center h-full text-center">
      <div className="bg-surface-white/60 backdrop-blur-md p-12 rounded-3xl border border-surface-container-highest shadow-sm">
        <Icon size={64} className="text-primary mb-6 mx-auto" strokeWidth={1.5} />
        <h1 className="font-display-lg text-display-lg text-primary mb-4">{title}</h1>
        <p className="font-body-lg text-body-lg text-secondary">{text}</p>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <div className="max-w-max-width mx-auto px-gutter w-full pb-12">
      {/* Header & Action */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div className="max-w-2xl">
          <h1 className="font-display-lg text-display-lg text-primary mb-4 hidden md:block">Community Projects</h1>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-4 md:hidden">Community Projects</h1>
          <p className="font-body-lg text-body-lg text-secondary">Discover how your neighbors are conserving water and contributing to a sustainable future. Explore successful harvesting systems, usage reduction initiatives, and quality improvement projects across the region.</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-surface-white font-body-md text-body-md px-6 py-3 rounded-lg shadow-sm transition-colors flex items-center gap-2 flex-shrink-0 cursor-pointer">
          <PlusCircle size={20} />
          Submit Your Project
        </button>
      </div>

      {/* Filters */}
      <div className="bg-surface-white rounded-xl p-6 shadow-[0px_4px_20px_rgba(26,111,160,0.08)] border border-surface-container-high mb-8 flex flex-wrap gap-4 items-center">
        <span className="font-label-mono text-label-mono text-secondary mr-2">Filters:</span>
        <div className="relative">
          <select className="appearance-none bg-surface-container-low border border-surface-container-high text-on-surface rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-tertiary-container focus:ring-1 focus:ring-tertiary-container font-body-md text-body-md cursor-pointer transition-colors">
            <option>All States</option>
            <option>California</option>
            <option>Texas</option>
            <option>Arizona</option>
          </select>
          <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary" />
        </div>
        <div className="relative">
          <select className="appearance-none bg-surface-container-low border border-surface-container-high text-on-surface rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-tertiary-container focus:ring-1 focus:ring-tertiary-container font-body-md text-body-md cursor-pointer transition-colors">
            <option>All Project Types</option>
            <option>Rainwater Harvesting</option>
            <option>Greywater System</option>
            <option>Drip Irrigation</option>
          </select>
          <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary" />
        </div>
        <div className="relative">
          <select className="appearance-none bg-surface-container-low border border-surface-container-high text-on-surface rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-tertiary-container focus:ring-1 focus:ring-tertiary-container font-body-md text-body-md cursor-pointer transition-colors">
            <option>All Scales</option>
            <option>Residential</option>
            <option>Agricultural</option>
            <option>Commercial</option>
          </select>
          <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary" />
        </div>
        <div className="ml-auto">
          <button className="text-primary hover:bg-surface-container-low px-4 py-2 rounded-lg font-body-md text-body-md transition-colors cursor-pointer">Clear All</button>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-surface-white rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(26,111,160,0.08)] border border-surface-container-high hover:shadow-[0px_8px_30px_rgba(26,111,160,0.12)] transition-shadow duration-300 group cursor-pointer flex flex-col h-full">
          <div className="h-48 relative overflow-hidden bg-surface-container-low">
            <img alt="Residential Rainwater Harvesting System" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB4tMQZ2l6nVDkliWjjoKMbMO0M0xhwdTyVNkzLCf-QFVmh8zZJ4jeZ0JLskrbXPO3DBT17foxhYhsWpLo9PNBd_435lIQi1-Ve-reP2PgAaSllpqnq98yDOsK_wTGJDtM8opuB60M18oBYy7YouB44rEVb3UJX4BSj7yIrfNfi-fsKW1Cq3-zFGTKVFkPIgxIyde2yxg0Ou00nLQKc4lZa7k4wZ-NO8Knqv6CPLA0tlkhbt6nRfYZOFl0-57y5xkJj7YLoqsEZ5E" />
            <div className="absolute top-4 left-4 bg-tertiary-container/10 text-tertiary-container px-3 py-1 rounded-full font-label-mono text-label-mono backdrop-blur-md">Residential</div>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center gap-2 text-secondary mb-2">
              <MapPin size={18} />
              <span className="font-caption text-caption">Austin, TX</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-3 line-clamp-2">Suburban Rainwater Catchment Expansion</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3 flex-grow">A community-funded initiative to install 5,000-gallon cisterns in a neighborhood, providing sustainable irrigation for shared community gardens and reducing municipal water reliance.</p>
            <div className="bg-surface-container-low p-4 rounded-lg flex items-center justify-between mt-auto cursor-default">
              <span className="font-body-md text-body-md text-secondary">Water Saved</span>
              <span className="font-label-mono text-label-mono text-primary font-bold">120,000 L/yr</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-white rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(26,111,160,0.08)] border border-surface-container-high hover:shadow-[0px_8px_30px_rgba(26,111,160,0.12)] transition-shadow duration-300 group cursor-pointer flex flex-col h-full">
          <div className="h-48 relative overflow-hidden bg-surface-container-low">
            <img alt="Agricultural Drip Irrigation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUCrp4VryErEdnxOTu9TQzjair6e3k6uWqwi7kqCiRAZUTAMaT6CAMrfDOvN_Hah3V-Eyh__aN2RDoWUEo558whcGo_UZLlcOiV9oS7lkPAnMtDbWCi-v2Ve4q0qZWnE7GxfbURBST9-MobqVHWgG5giwSX1HptY1fQ_pwmES9AKX9-C1B-2uAu_G7Ssh1tOmftNpicDhb1wZPGJpGK5OZYF6Gwn8MLLiFSxzFN_g-6QxxIBPtj6aCIiUUTbDw8tIWo5GLDjYRELc" />
            <div className="absolute top-4 left-4 bg-tertiary-container/10 text-tertiary-container px-3 py-1 rounded-full font-label-mono text-label-mono backdrop-blur-md">Agricultural</div>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center gap-2 text-secondary mb-2">
              <MapPin size={18} />
              <span className="font-caption text-caption">Fresno, CA</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-3 line-clamp-2">Orchard Smart Drip Conversion</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3 flex-grow">Transitioning a 50-acre almond orchard from flood irrigation to a sensor-driven smart drip system, significantly reducing evaporation and run-off while improving crop yield.</p>
            <div className="bg-surface-container-low p-4 rounded-lg flex items-center justify-between mt-auto cursor-default">
              <span className="font-body-md text-body-md text-secondary">Water Saved</span>
              <span className="font-label-mono text-label-mono text-primary font-bold">4.5M L/yr</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-white rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(26,111,160,0.08)] border border-surface-container-high hover:shadow-[0px_8px_30px_rgba(26,111,160,0.12)] transition-shadow duration-300 group cursor-pointer flex flex-col h-full">
          <div className="h-48 relative overflow-hidden bg-surface-container-low">
            <img alt="Urban Greywater System" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChm_k-WGHy0L6q9FRWC3pSjMfHsOfG2GgO06vkXGuMCNEZM3RUldvyJTe256-PQJoMVtNkbWU4YsL4v1zvM0eI1RQJtjlMDKfVSzhY-L_-bQefGjjjB6t52QBj9mJ8ty3oT30Ezv3ZceLqJyEgfYRVzfEhsbjblYzNv0PKD6zwYvUecWhb-2JdbZU_goQFD2TTbUFxCiTqooy4-zgCUpko2FYGRqbu3rt7ZT8o0OnbXxy7Y9ZhdWK3sW8L3x8aAqR44gjzb5VIxVM" />
            <div className="absolute top-4 left-4 bg-tertiary-container/10 text-tertiary-container px-3 py-1 rounded-full font-label-mono text-label-mono backdrop-blur-md">Commercial</div>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center gap-2 text-secondary mb-2">
              <MapPin size={18} />
              <span className="font-caption text-caption">Phoenix, AZ</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-3 line-clamp-2">Downtown Complex Greywater Reuse</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3 flex-grow">Implementation of a building-wide greywater filtration system that treats shower and sink water for use in toilet flushing and landscape irrigation across a 200-unit complex.</p>
            <div className="bg-surface-container-low p-4 rounded-lg flex items-center justify-between mt-auto cursor-default">
              <span className="font-body-md text-body-md text-secondary">Water Saved</span>
              <span className="font-label-mono text-label-mono text-primary font-bold">850,000 L/yr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Load More */}
      <div className="mt-12 text-center">
        <button className="bg-surface-white border border-outline-variant text-primary hover:bg-surface-container-low font-body-md text-body-md px-6 py-3 rounded-lg transition-colors cursor-pointer">Load More Projects</button>
      </div>
    </div>
  );
}

function CityAutocomplete({ 
  value, 
  onChange, 
  placeholder,
  className 
}: { 
  value: string; 
  onChange: (city: string) => void; 
  placeholder?: string;
  className?: string;
}) {
  const [inputValue, setInputValue] = useState(value);
  const [predictions, setPredictions] = useState<google.maps.places.PlacePrediction[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const placesLib = useMapsLibrary('places');
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (!placesLib) return;
    if (!sessionTokenRef.current) {
      sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
    }
  }, [placesLib]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    onChange(val);

    if (!val || !placesLib) {
      setPredictions([]);
      setIsOpen(false);
      return;
    }

    try {
      const response = await placesLib.AutocompleteSuggestion.fetchAutocompleteSuggestions({
        input: val,
        includedPrimaryTypes: ['locality', 'administrative_area_level_3'],
        sessionToken: sessionTokenRef.current || undefined
      });
      const validPredictions = response.suggestions
        .map(s => s.placePrediction)
        .filter((p): p is google.maps.places.PlacePrediction => p !== null);
      
      setPredictions(validPredictions);
      setIsOpen(true);
    } catch (e) {
      setPredictions([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (prediction: google.maps.places.PlacePrediction) => {
    if (placesLib) {
      sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
    }
    const textDesc = prediction.text?.text || prediction.text?.toString() || '';
    setInputValue(textDesc);
    onChange(textDesc);
    setIsOpen(false);
  };

  return (
    <div className="relative flex-grow w-full">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => { if (predictions.length > 0) setIsOpen(true); }}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder={placeholder || 'Search city...'}
        className={className}
      />
      {isOpen && predictions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 py-1 max-h-60 overflow-y-auto bg-surface-white border border-surface-container-high rounded-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] z-50 text-left">
          {predictions.map(p => (
            <li 
              key={p.placeId} 
              onMouseDown={(e) => e.preventDefault()} // Prevent blur from firing before click
              onClick={() => handleSelect(p)}
              className="px-4 py-2 hover:bg-surface-container-low cursor-pointer text-sm font-body-md text-on-surface whitespace-nowrap overflow-hidden text-ellipsis transition-colors"
            >
              {p.text?.text || p.text?.toString() || ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface HarvestingData {
  annualAverageRainfall: number;
  monthlyRainfall: number[];
  seasonalitySummary: string;
  verdictTitle: string;
  verdictStatus: string;
  verdictDescription: string;
  groundwaterContextItems: { status: string; text: string }[];
  rechargePriorityText: string;
}

function Harvesting() {
  const [area, setArea] = useState(120);
  const [cityInput, setCityInput] = useState("");
  const [selectedCity, setSelectedCity] = useState("New Delhi, IN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<HarvestingData | null>({
    annualAverageRainfall: 703,
    monthlyRainfall: [20, 30, 25, 15, 10, 60, 210, 190, 70, 10, 5, 15],
    seasonalitySummary: "78% of annual rainfall occurs during the monsoon season (July - September).",
    verdictTitle: "HIGHLY RECOMMENDED",
    verdictStatus: "success",
    verdictDescription: "New Delhi exhibits excellent potential for both rooftop collection and groundwater recharge.",
    groundwaterContextItems: [
      { status: "error", text: "Current water table declining by 0.5m annually." },
      { status: "error", text: "Classified as \"Over-exploited\" zone." },
      { status: "success", text: "Favorable soil permeability for recharge pits." }
    ],
    rechargePriorityText: "High"
  });

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!cityInput.trim()) return;
    
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/harvesting-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: cityInput.trim() })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to fetch");
      setData(json);
      setSelectedCity(cityInput.trim().toUpperCase());
      setCityInput("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'success') return <CheckCircle2 className="text-[#27AE60] mt-[2px] flex-shrink-0" size={16} />;
    if (status === 'warning') return <AlertTriangle className="text-[#F2994A] mt-[2px] flex-shrink-0" size={16} />;
    return <XCircle className="text-[#E74C3C] mt-[2px] flex-shrink-0" size={16} />;
  };

  const maxRainfall = data ? Math.max(...data.monthlyRainfall, 1) : 1;

  return (
    <div className="flex-grow flex flex-col items-center py-12 px-gutter w-full">
      <header className="text-center mb-12 max-w-2xl">
        <h1 className="font-display-lg text-display-lg text-primary mb-4 hidden md:block">Rainwater Harvesting Potential</h1>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-4 md:hidden">Rainwater Harvesting Potential</h1>
        <p className="font-body-lg text-body-lg text-secondary">Evaluate the feasibility and impact of implementing rainwater harvesting systems in your specific location.</p>
      </header>

      {/* Wizard Layout */}
      <div className="w-full max-w-[720px] flex flex-col gap-8">
        {/* Step 1: Location */}
        <div className="relative flex gap-6">
          <div className="absolute left-[15px] top-[32px] bottom-[-8px] w-[2px] bg-primary z-0"></div>
          <div className="flex-shrink-0">
            <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-label-mono text-label-mono bg-primary text-surface-white">1</div>
          </div>
          <div className="flex-grow bg-surface-white rounded-xl shadow-[0px_4px_20px_rgba(26,111,160,0.08)] dark:shadow-none border border-surface-container-high p-6">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2">
              <MapPin className="text-primary" size={24} />
              Select City
            </h2>
            <p className="font-body-md text-body-md text-secondary mb-6">Enter your location to load historical rainfall and groundwater data.</p>
            
            <form onSubmit={handleSearch} className="flex gap-4 mb-4">
              <CityAutocomplete
                value={cityInput}
                onChange={setCityInput}
                placeholder="E.g., New Delhi, IN or Mumbai"
                className="flex-grow bg-surface-bright border border-outline-variant rounded-lg px-4 py-3 font-body-lg text-body-lg text-on-surface focus:outline-none focus:border-tertiary-container focus:ring-2 focus:ring-tertiary-container/20 transition-all"
              />
              <button 
                type="submit" 
                disabled={loading}
                className="bg-primary hover:bg-primary/90 text-surface-white font-body-md text-body-md px-6 py-3 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 min-w-[120px]"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
                Search
              </button>
            </form>
            {error && <p className="text-alert-red mb-4">{error}</p>}

            <div className="flex flex-col items-start p-4 border-2 border-primary bg-surface-container-low rounded-lg text-left transition-all relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <span className="font-label-mono text-label-mono text-primary mb-1">SELECTED LOCATION</span>
              <span className="font-body-lg text-body-lg font-bold text-on-surface">{selectedCity}</span>
              <div className="absolute top-4 right-4">
                <CheckCircle2 className="text-primary" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Rainfall Data */}
        <div className="relative flex gap-6">
          <div className="absolute left-[15px] top-[32px] bottom-[-8px] w-[2px] bg-primary z-0"></div>
          <div className="flex-shrink-0">
            <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-label-mono text-label-mono bg-primary text-surface-white">2</div>
          </div>
          <div className="flex-grow bg-surface-white rounded-xl shadow-[0px_4px_20px_rgba(26,111,160,0.08)] dark:shadow-none border border-surface-container-high p-6">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2">
              <CloudRain className="text-primary" size={24} />
              Rainfall Analysis
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-end relative min-h-[160px]">
              {loading && (
                <div className="absolute inset-0 bg-surface-white/80 dark:bg-surface-container-high/80 z-20 flex items-center justify-center backdrop-blur-sm rounded-lg">
                  <Loader2 size={32} className="text-primary animate-spin" />
                </div>
              )}
              {data && <>
                <div className="flex-grow w-full">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-label-mono text-label-mono text-secondary">ANNUAL AVG ({selectedCity})</span>
                    <span className="font-headline-lg text-headline-lg text-primary">{data.annualAverageRainfall} <span className="text-body-md text-secondary">mm</span></span>
                  </div>
                  {/* Mini Chart */}
                  <div className="flex items-end h-[120px] gap-2 mt-6 border-b border-outline-variant pb-1">
                    {data.monthlyRainfall.map((h, i) => {
                      const percent = Math.max((h / maxRainfall) * 100, 10);
                      return (
                        <div 
                          key={i} 
                          title={`${h}mm`}
                          className={`flex-1 rounded-t-md min-h-[10%] transition-all duration-300 ${percent >= 80 ? 'bg-primary' : 'bg-primary/70 hover:bg-primary'}`} 
                          style={{ height: `${percent}%` }}
                        ></div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-2 font-caption text-caption text-secondary">
                    <span>Jan</span>
                    <span>Jul</span>
                    <span>Dec</span>
                  </div>
                </div>
                <div className="bg-surface-container-low p-4 rounded-lg md:w-48 flex-shrink-0 w-full">
                  <div className="font-label-mono text-label-mono text-primary mb-2">SEASONALITY</div>
                  <p className="font-body-md text-body-md text-on-surface">{data.seasonalitySummary}</p>
                </div>
              </>}
            </div>
          </div>
        </div>

        {/* Step 3: Harvesting Verdict */}
        <div className="relative flex gap-6">
          <div className="absolute left-[15px] top-[32px] bottom-[-8px] w-[2px] bg-primary z-0"></div>
          <div className="flex-shrink-0">
            <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-label-mono text-label-mono bg-primary text-surface-white">3</div>
          </div>
          <div className="flex-grow bg-surface-white rounded-xl shadow-[0px_4px_20px_rgba(26,111,160,0.08)] dark:shadow-none border border-surface-container-high p-6">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2">
              <ClipboardCheck className="text-primary" size={24} />
              Harvesting Verdict
            </h2>
            <div className="relative min-h-[160px]">
              {loading && (
                <div className="absolute inset-0 bg-surface-white/80 dark:bg-surface-container-high/80 z-20 flex items-center justify-center backdrop-blur-sm rounded-lg">
                  <Loader2 size={32} className="text-primary animate-spin" />
                </div>
              )}
              {data && <>
                <div className={`border-l-4 p-4 rounded-r-lg mb-6 flex items-start gap-4 ${
                  data.verdictStatus === 'success' ? 'bg-[#27AE60]/10 border-[#27AE60]' :
                  data.verdictStatus === 'warning' ? 'bg-[#F2994A]/10 border-[#F2994A]' :
                  'bg-[#E74C3C]/10 border-[#E74C3C]'
                }`}>
                  {data.verdictStatus === 'success' ? <CheckCircle2 className="text-[#27AE60] flex-shrink-0" size={24} /> :
                   data.verdictStatus === 'warning' ? <AlertTriangle className="text-[#F2994A] flex-shrink-0" size={24} /> :
                   <XCircle className="text-[#E74C3C] flex-shrink-0" size={24} />}
                  <div>
                    <h3 className={`font-headline-md text-headline-md mb-1 ${
                      data.verdictStatus === 'success' ? 'text-[#27AE60]' :
                      data.verdictStatus === 'warning' ? 'text-[#F2994A]' :
                      'text-[#E74C3C]'
                    }`}>{data.verdictTitle}</h3>
                    <p className="font-body-md text-body-md text-on-surface">{data.verdictDescription}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-label-mono text-label-mono text-secondary mb-3">GROUNDWATER CONTEXT</h4>
                    <ul className="space-y-3">
                      {data.groundwaterContextItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          {getStatusIcon(item.status)}
                          <span className="font-body-md text-body-md text-on-surface">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-surface-container p-4 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="font-display-lg text-display-lg text-primary">{data.rechargePriorityText}</div>
                      <div className="font-label-mono text-label-mono text-secondary mt-1">RECHARGE PRIORITY</div>
                    </div>
                  </div>
                </div>
              </>}
            </div>
          </div>
        </div>

        {/* Step 4: Potential Calculator */}
        <div className="relative flex gap-6">
          <div className="flex-shrink-0">
            <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-label-mono text-label-mono bg-surface-container-high text-secondary border border-outline-variant">4</div>
          </div>
          <div className="flex-grow bg-surface-white rounded-xl shadow-[0px_4px_20px_rgba(26,111,160,0.08)] dark:shadow-none border border-surface-container-high p-6">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2">
              <Calculator className="text-primary" size={24} />
              Potential Calculator
            </h2>
            <p className="font-body-md text-body-md text-secondary mb-6">Estimate your potential annual collection based on your available rooftop area.</p>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block font-label-mono text-label-mono text-secondary mb-2" htmlFor="rooftop-area">ROOFTOP AREA (SQ METERS)</label>
                <div className="relative">
                  <input 
                    className="w-full bg-surface-white border border-outline-variant rounded-lg px-4 py-3 font-body-lg text-body-lg text-on-surface focus:outline-none focus:border-tertiary-container focus:ring-2 focus:ring-tertiary-container/20 transition-all" 
                    id="rooftop-area" 
                    type="number" 
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                  />
                  <span className="absolute right-4 top-3 font-body-md text-secondary">m²</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => setArea(50)} className="bg-tertiary-container/10 text-tertiary-container font-label-mono text-label-mono px-3 py-1 rounded-full cursor-pointer hover:bg-tertiary-container/20 transition-colors">Small (50m²)</button>
                  <button onClick={() => setArea(120)} className="bg-tertiary-container/10 text-tertiary-container font-label-mono text-label-mono px-3 py-1 rounded-full cursor-pointer hover:bg-tertiary-container/20 transition-colors">Avg (120m²)</button>
                  <button onClick={() => setArea(250)} className="bg-tertiary-container/10 text-tertiary-container font-label-mono text-label-mono px-3 py-1 rounded-full cursor-pointer hover:bg-tertiary-container/20 transition-colors">Large (250m²)</button>
                </div>
              </div>
              <div className="flex-1 bg-primary text-surface-white rounded-lg p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
                <div className="font-label-mono text-label-mono text-primary-fixed-dim mb-2 relative z-10">ESTIMATED ANNUAL COLLECTION</div>
                <div className="font-display-lg text-display-lg font-bold relative z-10 text-surface-white">
                  {data ? Math.round(area * data.annualAverageRainfall * 0.85).toLocaleString() : 0}
                </div>
                <div className="font-body-md text-body-md text-primary-fixed-dim relative z-10">Liters / Year</div>
                <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.2)] w-full relative z-10 flex justify-between font-caption text-caption pt-4 text-primary-fixed-dim">
                  <span>Runoff Coefficient: 0.85</span>
                  <span>Filter Loss: ~5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface UsageData {
  currentUsage: number;
  usageTrend: number;
  recommendedLimit: number;
  capacityPercentage: number;
  dailyUsageByMonth: number[];
  dailyUsagePast7Years: number[];
}

function UsageTracker() {
  const [cityInput, setCityInput] = useState("");
  const [selectedCity, setSelectedCity] = useState("New Delhi, IN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState<"gallons" | "liters">("gallons");
  const [graphView, setGraphView] = useState<"month" | "year">("month");
  const [data, setData] = useState<UsageData | null>({
    currentUsage: 14.2,
    usageTrend: 5.2,
    recommendedLimit: 15.0,
    capacityPercentage: 88,
    dailyUsageByMonth: [1.4, 1.5, 1.6, 1.8, 2.1, 2.4, 2.3, 2.1, 1.8, 1.6, 1.4, 1.3],
    dailyUsagePast7Years: [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8],
  });

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!cityInput.trim()) return;
    
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/usage-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: cityInput.trim() })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to fetch");
      setData(json);
      setSelectedCity(cityInput.trim());
      setCityInput("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const convertVal = (val: number) => {
    return unit === "gallons" ? val : val * 3.78541;
  };

  const formatVal = (val: number) => {
    return convertVal(val).toFixed(1);
  };

  const unitLabel = unit === "gallons" ? "Gallons" : "Liters";
  
  // Calculate max for y-axis
  const activeChartData = data ? (graphView === "month" ? data.dailyUsageByMonth : data.dailyUsagePast7Years) : [];
  const maxDaily = activeChartData.length ? Math.max(...activeChartData) : 2.0;
  const maxChartVal = Math.ceil(convertVal(maxDaily) * 1.2 * 2) / 2; // Add padding and round

  return (
    <div className="flex-grow px-gutter max-w-max-width mx-auto w-full py-8 space-y-8">
      {/* Header & Controls */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display-lg text-display-lg text-primary md:block hidden">Water Usage Tracker</h1>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary md:hidden">Water Usage Tracker</h1>
          <p className="text-secondary mt-2">Monitor consumption patterns across sectors.</p>
        </div>
        <div className="flex flex-wrap gap-4 w-full md:w-auto items-center">
           <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto relative">
             <CityAutocomplete
                value={cityInput}
                onChange={setCityInput}
                placeholder="Search city e.g., New Delhi, IN"
                className="w-full bg-surface-white border border-outline-variant text-on-surface rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
              <button 
                type="submit" 
                disabled={loading}
                className="bg-primary hover:bg-primary/90 text-surface-white font-body-md px-4 py-2 rounded-lg transition-colors flex items-center justify-center min-w-[80px]"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : "Search"}
              </button>
          </form>
          <div className="flex bg-surface-container-high rounded-lg p-1">
            <button 
              onClick={() => setUnit("gallons")} 
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${unit === 'gallons' ? 'bg-surface-white text-primary shadow-sm' : 'text-secondary hover:text-on-surface'}`}
            >
              Gallons
            </button>
            <button 
              onClick={() => setUnit("liters")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${unit === 'liters' ? 'bg-surface-white text-primary shadow-sm' : 'text-secondary hover:text-on-surface'}`}
            >
              Liters
            </button>
          </div>
        </div>
      </header>
      
      {error && <p className="text-alert-red">{error}</p>}
      
      <div className="font-label-mono text-primary bg-surface-container-low px-4 py-2 rounded-lg inline-block border border-outline-variant/30 text-sm">
         Showing data for <span className="font-bold">{selectedCity.toUpperCase()}</span>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {loading && (
            <div className="absolute inset-0 bg-surface-white/60 dark:bg-surface-container/60 z-20 flex items-center justify-center backdrop-blur-sm rounded-xl">
               <Loader2 size={32} className="text-primary animate-spin" />
            </div>
        )}
        {/* Stat 1 */}
        <div className="bg-surface-white/70 backdrop-blur-md border border-surface-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.05)] rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Droplet size={60} className="text-primary" />
          </div>
          <h3 className="text-secondary font-body-md text-body-md mb-2">Current Usage (MTD)</h3>
          <div className="flex items-end gap-2">
            <span className="font-headline-lg text-headline-lg text-on-surface">{data ? formatVal(data.currentUsage) : "0"}M</span>
            <span className="font-label-mono text-label-mono text-secondary mb-1">{unitLabel}</span>
          </div>
          {data && (
            <div className={`mt-4 flex items-center w-fit px-2 py-1 rounded ${data.usageTrend > 0 ? "text-alert-red bg-alert-red/10" : "text-safe-green bg-safe-green/10"}`}>
              {data.usageTrend > 0 ? <TrendingUp size={16} className="mr-1" /> : <TrendingUp size={16} className="mr-1 transform rotate-180" />}
              <span className="text-sm font-medium">{Math.abs(data.usageTrend)}% vs Last Month</span>
            </div>
          )}
        </div>

        {/* Stat 2 */}
        <div className="bg-surface-white/70 backdrop-blur-md border border-surface-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.05)] rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <CheckCircle2 size={60} className="text-safe-green" />
          </div>
          <h3 className="text-secondary font-body-md text-body-md mb-2">Recommended Limit</h3>
          <div className="flex items-end gap-2">
            <span className="font-headline-lg text-headline-lg text-on-surface">{data ? formatVal(data.recommendedLimit) : "0"}M</span>
            <span className="font-label-mono text-label-mono text-secondary mb-1">{unitLabel}</span>
          </div>
          {data && (
            <div className={`mt-4 flex items-center w-fit px-2 py-1 rounded ${data.currentUsage <= data.recommendedLimit ? "text-safe-green bg-safe-green/10" : "text-alert-red bg-alert-red/10"}`}>
              {data.currentUsage <= data.recommendedLimit ? <Info size={16} className="mr-1" /> : <AlertTriangle size={16} className="mr-1" />}
              <span className="text-sm font-medium">
                 {data.currentUsage <= data.recommendedLimit ? "Within safe threshold" : "Exceeds safe limit"}
              </span>
            </div>
          )}
        </div>

        {/* Stat 3 (Gauge) */}
        <div className="bg-surface-white/70 backdrop-blur-md border border-surface-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.05)] rounded-xl p-6 flex flex-col justify-center items-center">
          <h3 className="text-secondary font-body-md text-body-md mb-4 w-full text-left">Capacity Status</h3>
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="none" r="40" stroke="var(--color-surface-container-high)" strokeWidth="12"></circle>
              {data && (
                <circle 
                   className="transition-all duration-1000" 
                   cx="50" cy="50" fill="none" r="40" 
                   stroke="var(--color-primary)" 
                   strokeDasharray="251.2" 
                   strokeDashoffset={251.2 - (251.2 * data.capacityPercentage) / 100} 
                   strokeWidth="12"
                   strokeLinecap="round"
                ></circle>
              )}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-headline-md text-headline-md font-bold text-primary">
                {data ? `${data.capacityPercentage}%` : "0%"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chart Area */}
      <section className="bg-surface-white/70 backdrop-blur-md border border-surface-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.05)] rounded-xl p-6 md:p-8 relative">
        {loading && (
            <div className="absolute inset-0 bg-surface-white/60 dark:bg-surface-container/60 z-20 flex items-center justify-center backdrop-blur-sm rounded-xl">
            </div>
        )}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">Average Daily Water Usage</h2>
            <p className="text-secondary mt-1 text-sm">Total daily consumption (Millions of {unitLabel})</p>
          </div>
          <div className="flex bg-surface-container-high rounded-lg p-1">
            <button 
              onClick={() => setGraphView("month")} 
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${graphView === 'month' ? 'bg-surface-white text-primary shadow-sm' : 'text-secondary hover:text-on-surface'}`}
            >
              By Month
            </button>
            <button 
              onClick={() => setGraphView("year")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${graphView === 'year' ? 'bg-surface-white text-primary shadow-sm' : 'text-secondary hover:text-on-surface'}`}
            >
              Past 7 Years
            </button>
          </div>
        </div>

        {/* Bar Chart Visualization */}
        <div className="relative w-full overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Y-Axis Labels */}
            <div className="absolute left-0 top-0 h-[300px] flex flex-col justify-between text-xs text-secondary font-label-mono py-5 pr-2 border-r border-surface-container-high bg-surface-white/50 backdrop-blur-sm z-10 w-12 text-right">
              <span>{maxChartVal.toFixed(1)}M</span>
              <span>{(maxChartVal * 0.75).toFixed(1)}M</span>
              <span>{(maxChartVal * 0.5).toFixed(1)}M</span>
              <span>{(maxChartVal * 0.25).toFixed(1)}M</span>
              <span>0</span>
            </div>
            
            <div className="flex items-end h-[300px] gap-4 py-5 border-b-2 border-surface-container-high ml-12 px-4">
              {data && activeChartData.map((val, index) => {
                 const total = convertVal(val);
                 const heightP = (total / maxChartVal) * 100;
                 const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                 const currentYear = new Date().getFullYear();
                 const yearLabels = Array.from({length: 7}, (_, i) => (currentYear - 6 + i).toString());
                 const labels = graphView === "month" ? monthLabels : yearLabels;
                 return (
                   <div key={index} className="flex flex-col justify-end flex-1 items-center group relative h-full">
                     <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-on-surface text-surface-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                       {labels[index]}: {total.toFixed(1)}M {unitLabel}
                     </div>
                     <div className="w-full max-w-[40px] rounded-t-sm transition-all duration-500 bg-primary" style={{ height: `${heightP}%` }}></div>
                     <span className="text-xs text-secondary mt-2 font-label-mono absolute -bottom-6">{labels[index]}</span>
                   </div>
                 );
              })}
            </div>
            <div className="h-6"></div> {/* Spacer for x-axis labels */}
          </div>
        </div>
      </section>


    </div>
  );
}

interface CropData {
  name: string;
  icon: string;
  status: string;
  statusColor: string;
}

interface WaterQualityData {
  overallStatus: "GOOD" | "MODERATE" | "POOR";
  phLevel: number;
  tds: number;
  turbidity: number;
  isSafeForDrinking: boolean;
  suitableCrops: CropData[];
}

function WaterQuality() {
  const [cityInput, setCityInput] = useState("");
  const [selectedCity, setSelectedCity] = useState("New Delhi, IN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<WaterQualityData | null>({
    overallStatus: "GOOD",
    phLevel: 7.2,
    tds: 320,
    turbidity: 1.5,
    isSafeForDrinking: true,
    suitableCrops: [
      { name: "Wheat", icon: "Wheat", status: "Optimal", statusColor: "safe-green" },
      { name: "Alfalfa", icon: "Tractor", status: "Optimal", statusColor: "safe-green" },
      { name: "Almonds", icon: "Leaf", status: "Fair", statusColor: "earth-brown" },
      { name: "Tomatoes", icon: "Sprout", status: "Fair", statusColor: "earth-brown" },
      { name: "Rice", icon: "Droplet", status: "Too Dry", statusColor: "alert-red" },
    ]
  });

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!cityInput.trim()) return;
    
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/water-quality", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: cityInput.trim() })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to fetch");
      setData(json);
      setSelectedCity(cityInput.trim());
      setCityInput("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow pt-24 px-gutter max-w-max-width mx-auto w-full pb-12">
      {/* Header & Location */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-2">Water Quality Report</h1>
          <p className="font-body-lg text-body-lg text-secondary">Analyzing local groundwater and surface sources.</p>
        </div>
        <div className="w-full md:w-auto flex gap-2">
          <form onSubmit={handleSearch} className="flex gap-2 w-full relative group">
            <CityAutocomplete
              value={cityInput}
              onChange={setCityInput}
              placeholder="Search location..."
              className="flex items-center justify-between w-full md:w-64 px-4 py-3 bg-surface-white border border-surface-container-high rounded-lg hover:border-primary-container focus:outline-none focus:border-primary transition-colors shadow-[0_4px_20px_rgba(26,111,160,0.08)]"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-primary text-on-primary rounded-lg px-4 hover:bg-primary-container transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
            </button>
          </form>
        </div>
      </div>

      {error && (
        <div className="bg-error-container text-on-error-container p-4 rounded-lg mb-8 flex items-start gap-3">
          <AlertTriangle className="mt-0.5 flex-shrink-0" size={20} />
          <div>
            <h4 className="font-bold mb-1">Could not fetch quality data</h4>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Overall Quality Summary Card */}
        <div className="col-span-1 md:col-span-8 bg-surface-white rounded-xl shadow-[0_4px_20px_rgba(26,111,160,0.08)] border border-surface-container-high p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline-md text-headline-md text-primary">Overall Quality: {selectedCity}</h2>
              {data?.overallStatus === 'GOOD' && (
                <span className="bg-safe-green/10 text-safe-green font-label-mono text-label-mono px-3 py-1 rounded-full flex items-center gap-1 border border-safe-green/20">
                  <CheckCircle2 size={16} /> GOOD
                </span>
              )}
              {data?.overallStatus === 'MODERATE' && (
                <span className="bg-earth-brown/10 text-earth-brown font-label-mono text-label-mono px-3 py-1 rounded-full flex items-center gap-1 border border-earth-brown/20">
                  <AlertTriangle size={16} /> MODERATE
                </span>
              )}
              {data?.overallStatus === 'POOR' && (
                <span className="bg-alert-red/10 text-alert-red font-label-mono text-label-mono px-3 py-1 rounded-full flex items-center gap-1 border border-alert-red/20">
                  <XCircle size={16} /> POOR
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {/* Metric: pH */}
              <div className="p-4 bg-surface rounded-lg border border-surface-container-high hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Droplet size={24} className="text-tertiary-container" />
                  <span className="font-body-md text-body-md text-secondary">pH Level</span>
                </div>
                <div className="font-headline-lg text-headline-lg text-primary">{data?.phLevel}</div>
                <div className="font-caption text-caption text-secondary mt-1">Optimal: 6.5 - 8.5</div>
              </div>
              
              {/* Metric: TDS */}
              <div className="p-4 bg-surface rounded-lg border border-surface-container-high hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <CloudRain size={24} className="text-earth-brown" />
                  <span className="font-body-md text-body-md text-secondary">TDS</span>
                </div>
                <div className="font-headline-lg text-headline-lg text-primary">{data?.tds} <span className="font-body-md text-body-md text-secondary">ppm</span></div>
                <div className="font-caption text-caption text-secondary mt-1">Acceptable &lt; 500</div>
              </div>
              
              {/* Metric: Turbidity */}
              <div className="p-4 bg-surface rounded-lg border border-surface-container-high hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Cloud size={24} className="text-outline" />
                  <span className="font-body-md text-body-md text-secondary">Turbidity</span>
                </div>
                <div className="font-headline-lg text-headline-lg text-primary">{data?.turbidity} <span className="font-body-md text-body-md text-secondary">NTU</span></div>
                <div className="font-caption text-caption text-secondary mt-1">Clear &lt; 5</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-caption font-caption text-secondary mt-4 pt-4 border-t border-surface-container-high">
            <Info size={16} />
            Source: Regional Water Resources Board - Estimated via Gemini AI
          </div>
        </div>

        {/* Drinkable Verdict */}
        <div className="col-span-1 md:col-span-4 bg-surface-white rounded-xl shadow-[0_4px_20px_rgba(26,111,160,0.08)] border border-surface-container-high p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl ${data?.isSafeForDrinking ? 'bg-safe-green/5' : 'bg-alert-red/5'}`}></div>
          <h3 className="font-body-lg text-body-lg text-secondary mb-4 z-10">Safe for Drinking?</h3>
          <div className={`w-32 h-32 rounded-full border-8 flex items-center justify-center mb-4 z-10 bg-surface-white shadow-inner ${data?.isSafeForDrinking ? 'border-safe-green' : 'border-alert-red'}`}>
            <span className={`font-display-lg text-display-lg font-bold ${data?.isSafeForDrinking ? 'text-safe-green' : 'text-alert-red'}`}>
              {data?.isSafeForDrinking ? 'YES' : 'NO'}
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface mt-2 z-10">
            {data?.isSafeForDrinking 
              ? 'Water meets all safety standards for direct consumption after basic filtration.'
              : 'Water requires significant treatment or alternative sources should be used for consumption.'}
          </p>
        </div>

        {/* Crops Which Can Grow */}
        <div className="col-span-1 md:col-span-12 bg-surface-white rounded-xl shadow-[0_4px_20px_rgba(26,111,160,0.08)] border border-surface-container-high p-6 md:p-8">
          <h2 className="font-headline-md text-headline-md text-primary mb-2">Suitable Crops</h2>
          <p className="font-body-md text-body-md text-secondary mb-4">Based on current soil moisture, pH, and estimated local weather patterns.</p>
          
          <ul className="space-y-3">
            {data?.suitableCrops?.map((crop, idx) => {
              // Map colors safely based on response
              const colorMappings: Record<string, string> = {
                'safe-green': 'text-safe-green',
                'alert-red': 'text-alert-red',
                'earth-brown': 'text-earth-brown',
                'tertiary-container': 'text-tertiary-container',
              };

              const textColor = colorMappings[crop.statusColor] || 'text-tertiary-container';

              return (
                <li key={idx} className={`flex items-center justify-between p-3 rounded-lg border border-surface-container-high bg-surface ${crop.status === 'Too Dry' || crop.status === 'Poor' ? 'opacity-70' : ''}`}>
                  <span className="font-body-md text-body-md text-on-surface font-medium">{crop.name}</span>
                  <span className={`font-label-mono text-label-mono ${textColor} px-2 py-1 rounded bg-surface-container-low`}>{crop.status}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (!hasValidKey) {
    return (
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'sans-serif'}}>
        <div style={{textAlign:'center',maxWidth:520}}>
          <h2>Google Maps API Key Required</h2>
          <p><strong>Step 1:</strong> <a href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" target="_blank" rel="noopener">Get an API Key</a></p>
          <p><strong>Step 2:</strong> Add your key as a secret in AI Studio:</p>
          <ul style={{textAlign:'left',lineHeight:'1.8'}}>
            <li>Open <strong>Settings</strong> (⚙️ gear icon, <strong>top-right corner</strong>)</li>
            <li>Select <strong>Secrets</strong></li>
            <li>Type <code>GOOGLE_MAPS_PLATFORM_KEY</code> as the secret name, press <strong>Enter</strong></li>
            <li>Paste your API key as the value, press <strong>Enter</strong></li>
          </ul>
          <p>The app rebuilds automatically after you add the secret.</p>
        </div>
      </div>
    );
  }

  const navLinkClass = (path: string) => `
    font-body-md text-body-md rounded-lg px-3 py-2 transition-colors
    ${location.pathname === path 
      ? 'text-primary font-bold border-b-2 border-primary pb-1 bg-surface-container-low' 
      : 'text-secondary hover:text-primary hover:bg-surface-container-low'
    }
  `;

  return (
    <APIProvider apiKey={API_KEY} version="weekly">
      <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col overflow-x-hidden">
        {/* TopNavBar */}
      <nav className="bg-surface-white/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-surface-container-high shadow-sm transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center px-gutter max-w-max-width mx-auto h-16">
          <Link to="/" className="font-headline-md text-headline-md font-bold text-primary">
            AquaInsight
          </Link>
          <div className="hidden md:flex space-x-2 items-center">
            <Link to="/" className={navLinkClass('/')}>Home</Link>
            <Link to="/water-quality" className={navLinkClass('/water-quality')}>Water Quality</Link>
            <Link to="/usage" className={navLinkClass('/usage')}>Usage</Link>
            <Link to="/harvesting" className={navLinkClass('/harvesting')}>Harvesting</Link>
            <Link to="/projects" className={navLinkClass('/projects')}>Projects</Link>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full text-secondary hover:bg-surface-container-low transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-12 relative flex flex-col w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/water-quality" 
            element={<WaterQuality />} 
          />
          <Route 
            path="/usage" 
            element={<UsageTracker />} 
          />
          <Route 
            path="/harvesting" 
            element={<Harvesting />}
          />
          <Route 
            path="/projects" 
            element={<Projects />}
          />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-highest w-full mt-auto py-12 px-gutter z-10 relative">
        <div className="max-w-max-width mx-auto flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
          <div>
            <div className="font-headline-md text-headline-md text-primary mb-2">
              AquaInsight
            </div>
            <p className="font-caption text-caption text-on-surface opacity-80">
              © 2026 AquaInsight. Grounded in Civic Modernism.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 md:justify-end items-center">
            <a
              href="#"
              className="font-caption text-caption text-secondary hover:text-primary hover:underline transition-opacity opacity-80 hover:opacity-100"
            >
              Data Credits
            </a>
            <a
              href="#"
              className="font-caption text-caption text-secondary hover:text-primary hover:underline transition-opacity opacity-80 hover:opacity-100"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-caption text-caption text-secondary hover:text-primary hover:underline transition-opacity opacity-80 hover:opacity-100"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="font-caption text-caption text-secondary hover:text-primary hover:underline transition-opacity opacity-80 hover:opacity-100"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
    </APIProvider>
  );
}
