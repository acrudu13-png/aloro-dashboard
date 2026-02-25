import { useState, useMemo } from 'react';
import {
  Upload,
  Download,
  Search,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  User,
  MoreHorizontal,
  Ban,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';

interface Customer {
  id: string;
  name: string | null;
  phone: string;
  email: string | null;
  totalCalls: number;
  answeredCalls: number;
  answerRate: number;
  avgDuration: string;
  lastContact: string;
  status: 'active' | 'do_not_call' | 'callback' | 'completed';
}

const mockCustomers: Customer[] = [
  { id: '1', name: 'Maria Popescu', phone: '+40 744 123 456', email: 'maria.popescu@email.ro', totalCalls: 12, answeredCalls: 10, answerRate: 83.3, avgDuration: '4:32', lastContact: 'Feb 25, 2026', status: 'active' },
  { id: '2', name: 'Ion Ionescu', phone: '+40 756 234 567', email: 'ion.ionescu@email.ro', totalCalls: 8, answeredCalls: 6, answerRate: 75.0, avgDuration: '3:15', lastContact: 'Feb 24, 2026', status: 'callback' },
  { id: '3', name: null, phone: '+40 722 345 678', email: null, totalCalls: 5, answeredCalls: 2, answerRate: 40.0, avgDuration: '2:45', lastContact: 'Feb 23, 2026', status: 'active' },
  { id: '4', name: 'Elena Dumitrescu', phone: '+40 733 456 789', email: 'elena.d@email.ro', totalCalls: 15, answeredCalls: 14, answerRate: 93.3, avgDuration: '5:12', lastContact: 'Feb 25, 2026', status: 'completed' },
  { id: '5', name: 'Alexandru Marin', phone: '+40 744 567 890', email: 'alex.marin@email.ro', totalCalls: 3, answeredCalls: 0, answerRate: 0, avgDuration: '-', lastContact: 'Feb 20, 2026', status: 'do_not_call' },
  { id: '6', name: 'Cristina Stoica', phone: '+40 755 678 901', email: 'cristina.s@email.ro', totalCalls: 7, answeredCalls: 5, answerRate: 71.4, avgDuration: '3:48', lastContact: 'Feb 22, 2026', status: 'active' },
  { id: '7', name: null, phone: '+40 766 789 012', email: null, totalCalls: 4, answeredCalls: 3, answerRate: 75.0, avgDuration: '2:30', lastContact: 'Feb 21, 2026', status: 'callback' },
  { id: '8', name: 'Mihai Radu', phone: '+40 777 890 123', email: 'mihai.radu@email.ro', totalCalls: 9, answeredCalls: 7, answerRate: 77.8, avgDuration: '4:05', lastContact: 'Feb 24, 2026', status: 'active' },
  { id: '9', name: 'Ana Vasilescu', phone: '+40 788 901 234', email: 'ana.v@email.ro', totalCalls: 6, answeredCalls: 5, answerRate: 83.3, avgDuration: '3:22', lastContact: 'Feb 23, 2026', status: 'completed' },
  { id: '10', name: 'Dan Nicolae', phone: '+40 799 012 345', email: null, totalCalls: 2, answeredCalls: 1, answerRate: 50.0, avgDuration: '1:45', lastContact: 'Feb 19, 2026', status: 'do_not_call' },
  { id: '11', name: 'Ioana Georgescu', phone: '+40 711 123 456', email: 'ioana.g@email.ro', totalCalls: 11, answeredCalls: 9, answerRate: 81.8, avgDuration: '4:50', lastContact: 'Feb 25, 2026', status: 'active' },
  { id: '12', name: null, phone: '+40 722 234 567', email: null, totalCalls: 1, answeredCalls: 1, answerRate: 100.0, avgDuration: '5:30', lastContact: 'Feb 18, 2026', status: 'completed' },
  { id: '13', name: 'Florin Tudor', phone: '+40 733 345 678', email: 'florin.t@email.ro', totalCalls: 4, answeredCalls: 2, answerRate: 50.0, avgDuration: '2:15', lastContact: 'Feb 20, 2026', status: 'callback' },
  { id: '14', name: 'Laura Stan', phone: '+40 744 456 789', email: 'laura.stan@email.ro', totalCalls: 8, answeredCalls: 6, answerRate: 75.0, avgDuration: '3:35', lastContact: 'Feb 22, 2026', status: 'active' },
  { id: '15', name: 'Ciprian Neagu', phone: '+40 755 567 890', email: null, totalCalls: 3, answeredCalls: 2, answerRate: 66.7, avgDuration: '2:58', lastContact: 'Feb 21, 2026', status: 'active' },
];

type SortKey = keyof Customer;
type SortDirection = 'asc' | 'desc';

const statusConfig: Record<Customer['status'], { label: string; variant: 'success' | 'danger' | 'warning' | 'info' | 'default' }> = {
  active: { label: 'Active', variant: 'success' },
  do_not_call: { label: 'Do Not Call', variant: 'danger' },
  callback: { label: 'Call Back', variant: 'warning' },
  completed: { label: 'Completed', variant: 'info' },
};

const ITEMS_PER_PAGE = 10;

export function CustomersPage() {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('lastContact');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showActions, setShowActions] = useState<string | null>(null);

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const query = searchQuery.toLowerCase();
      return (
        customer.phone.toLowerCase().includes(query) ||
        (customer.name?.toLowerCase().includes(query) ?? false) ||
        (customer.email?.toLowerCase().includes(query) ?? false)
      );
    });
  }, [customers, searchQuery]);

  const sortedCustomers = useMemo(() => {
    return [...filteredCustomers].sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];

      // Handle null values
      if (aVal === null) aVal = '';
      if (bVal === null) bVal = '';

      // Handle string comparison
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredCustomers, sortKey, sortDirection]);

  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedCustomers.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedCustomers, currentPage]);

  const totalPages = Math.ceil(sortedCustomers.length / ITEMS_PER_PAGE);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortKey !== columnKey) return null;
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-3 h-3" /> 
      : <ChevronDown className="w-3 h-3" />;
  };

  const handleExport = () => {
    const headers = ['Name', 'Phone', 'Email', 'Total Calls', 'Answered', 'Answer Rate', 'Avg Duration', 'Last Contact', 'Status'];
    const rows = sortedCustomers.map(c => [
      c.name ?? '',
      c.phone,
      c.email ?? '',
      c.totalCalls,
      c.answeredCalls,
      `${c.answerRate}%`,
      c.avgDuration,
      c.lastContact,
      c.status
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `customers_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Customers</h1>
          <p className="text-sm text-slate-500 mt-0.5">{sortedCustomers.length} customers in database</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition">
            <Upload className="w-4 h-4" />
            Import CSV
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-lg text-sm font-medium transition"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th 
                  className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    Name <SortIcon columnKey="name" />
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('phone')}
                >
                  <div className="flex items-center gap-1">
                    Phone <SortIcon columnKey="phone" />
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center gap-1">
                    Email <SortIcon columnKey="email" />
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('totalCalls')}
                >
                  <div className="flex items-center gap-1">
                    Total Calls <SortIcon columnKey="totalCalls" />
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('answeredCalls')}
                >
                  <div className="flex items-center gap-1">
                    Answered <SortIcon columnKey="answeredCalls" />
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('answerRate')}
                >
                  <div className="flex items-center gap-1">
                    Rate <SortIcon columnKey="answerRate" />
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('avgDuration')}
                >
                  <div className="flex items-center gap-1">
                    Avg Duration <SortIcon columnKey="avgDuration" />
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('lastContact')}
                >
                  <div className="flex items-center gap-1">
                    Last Contact <SortIcon columnKey="lastContact" />
                  </div>
                </th>
                <th 
                  className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-1">
                    Status <SortIcon columnKey="status" />
                  </div>
                </th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map(customer => (
                <tr key={customer.id} className="border-t border-slate-50 hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                        {customer.name ? (
                          <span className="text-xs font-medium text-slate-600">
                            {customer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </span>
                        ) : (
                          <User className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <span className="text-sm text-slate-700">
                        {customer.name ?? <span className="text-slate-400 italic">Unknown</span>}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {customer.phone}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {customer.email ? (
                      <div className="flex items-center gap-1.5 text-sm text-slate-600">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {customer.email}
                      </div>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">{customer.totalCalls}</td>
                  <td className="py-3 px-4 text-sm text-slate-600">{customer.answeredCalls}</td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-medium ${
                      customer.answerRate >= 80 ? 'text-green-600' :
                      customer.answerRate >= 50 ? 'text-amber-600' :
                      'text-red-500'
                    }`}>
                      {customer.answerRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">{customer.avgDuration}</td>
                  <td className="py-3 px-4 text-sm text-slate-500">{customer.lastContact}</td>
                  <td className="py-3 px-4">
                    <Badge variant={statusConfig[customer.status].variant}>
                      {statusConfig[customer.status].label}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 relative">
                    <button 
                      onClick={() => setShowActions(showActions === customer.id ? null : customer.id)}
                      className="p-1 text-slate-400 hover:text-slate-600"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    {showActions === customer.id && (
                      <div className="absolute right-4 top-full mt-1 w-40 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                          <Phone className="w-4 h-4" />
                          Call Now
                        </button>
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                          <Clock className="w-4 h-4" />
                          Schedule Call
                        </button>
                        {customer.status !== 'do_not_call' ? (
                          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                            <Ban className="w-4 h-4" />
                            Do Not Call
                          </button>
                        ) : (
                          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-green-600 hover:bg-green-50">
                            <CheckCircle className="w-4 h-4" />
                            Reactivate
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {paginatedCustomers.length === 0 && (
                <tr>
                  <td colSpan={10} className="py-10 text-center text-slate-500">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, sortedCustomers.length)} of {sortedCustomers.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded text-sm font-medium transition ${
                    currentPage === page
                      ? 'bg-accent-500 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
