'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock,
  RefreshCw,
  Database,
  Server,
  Lock
} from 'lucide-react';

// Admin password protection
const ADMIN_PASSWORD = 'Ppspadmin@2029';

interface CheckResult {
  name: string;
  status: 'healthy' | 'unhealthy' | 'error';
  responseTime?: number;
  message?: string;
  timestamp: string;
}

interface MonitorReport {
  timestamp: string;
  overallStatus: 'healthy' | 'degraded' | 'error';
  checks: CheckResult[];
  summary: {
    total: number;
    healthy: number;
    unhealthy: number;
    errors: number;
  };
  nextCheck: string;
}

export default function MonitoringDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [report, setReport] = useState<MonitorReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem('monitoring_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      runCheck();
      const interval = setInterval(runCheck, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const checkPassword = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('monitoring_auth', 'true');
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('monitoring_auth');
    setPassword('');
  };

  const runCheck = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch('/api/monitor');
      const data = await res.json();
      setReport(data);
    } catch (err) {
      setError('Failed to run monitoring check');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'unhealthy':
        return <AlertCircle className="w-6 h-6 text-amber-500" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Activity className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'unhealthy':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Admin Access Required</h1>
            <p className="text-gray-600 mt-2">Enter password to view monitoring dashboard</p>
          </div>
          
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
              }}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && checkPassword()}
            />
            
            {passwordError && (
              <p className="text-red-600 text-sm">Incorrect password</p>
            )}
            
            <button
              onClick={checkPassword}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Access Dashboard
            </button>
          </div>
          
          <p className="text-xs text-gray-500 text-center mt-6">
            Protected area - Authorized personnel only
          </p>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Activity className="w-8 h-8 text-blue-600" />
              System Monitoring
            </h1>
            <p className="text-gray-600 mt-2">
              Automated monitoring for PPS Recycling LLC
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={runCheck}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Checking...' : 'Run Check Now'}
            </button>
            <button
              onClick={logout}
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {report && (
          <>
            <div className={`rounded-lg p-6 mb-6 border-2 ${getStatusColor(report.overallStatus)}`}>
              <div className="flex items-center gap-4">
                {getStatusIcon(report.overallStatus)}
                <div>
                  <h2 className="text-xl font-bold">Status: {report.overallStatus.toUpperCase()}</h2>
                  <p className="text-sm">Last checked: {new Date(report.timestamp).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-2xl font-bold">{report.summary.total}</div>
                <div className="text-sm text-gray-600">Total Checks</div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-2xl font-bold text-green-600">{report.summary.healthy}</div>
                <div className="text-sm text-gray-600">Healthy</div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-2xl font-bold text-amber-600">{report.summary.unhealthy}</div>
                <div className="text-sm text-gray-600">Unhealthy</div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-2xl font-bold text-red-600">{report.summary.errors}</div>
                <div className="text-sm text-gray-600">Errors</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h3 className="font-semibold">Check Results</h3>
              </div>
              <div className="divide-y">
                {report.checks.map((check) => (
                  <div key={check.name} className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(check.status)}
                      <div>
                        <h4 className="font-semibold">{check.name}</h4>
                        <p className="text-sm text-gray-600">{check.message}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      check.status === 'healthy' ? 'bg-green-100 text-green-800' :
                      check.status === 'unhealthy' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {check.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <a href="https://app.supabase.com/project/tmbclpglikapugyldpzs" target="_blank" className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
                <Database className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium">Supabase</div>
                  <div className="text-sm text-gray-600">Database Dashboard</div>
                </div>
              </a>
              <a href="https://vercel.com/zakanova/ppsprecyclingllc/settings/cron-jobs" target="_blank" className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
                <Server className="w-5 h-5 text-black" />
                <div>
                  <div className="font-medium">Vercel Cron</div>
                  <div className="text-sm text-gray-600">Cron Job Logs</div>
                </div>
              </a>
              <a href="https://ppsprecyclingllc.com/api/health" target="_blank" className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
                <Activity className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium">Health Check</div>
                  <div className="text-sm text-gray-600">Test Endpoint</div>
                </div>
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}