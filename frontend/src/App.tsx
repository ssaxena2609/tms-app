import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SHIPMENTS, DELETE_SHIPMENT, TOGGLE_FLAG_SHIPMENT } from './graphql/queries';
import { Shipment, ShipmentFilter, PaginationInput } from './types/shipment';
import { User } from './types/auth';
import Header from './components/Header/Header';
import Auth from './components/Auth/Auth';
import ShipmentCard from './components/ShipmentCard/ShipmentCard';
import ShipmentGrid from './components/ShipmentGrid/ShipmentGrid';
import ShipmentDetails from './components/ShipmentDetails/ShipmentDetails';
import FilterBar from './components/FilterBar/FilterBar';
import Pagination from './components/Pagination/Pagination';
import Loading from './components/Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [viewType, setViewType] = useState<'grid' | 'tile'>('tile');
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [filters, setFilters] = useState<ShipmentFilter>({});
  const [pagination, setPagination] = useState<PaginationInput>({
    page: 1,
    limit: 12,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const { loading, error, data, refetch } = useQuery(GET_SHIPMENTS, {
    variables: {
      filter: Object.keys(filters).length > 0 ? filters : undefined,
      pagination,
    },
    skip: !isAuthenticated,
  });

  const [deleteShipment] = useMutation(DELETE_SHIPMENT);
  const [toggleFlagShipment] = useMutation(TOGGLE_FLAG_SHIPMENT);

  const handleLoginSuccess = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setIsAuthenticated(false);
    toast.info('You have been logged out');
  };

  const handleEdit = (shipment: Shipment) => {
    if (currentUser?.role !== 'ADMIN') {
      toast.warning('Only admins can edit shipments');
      return;
    }
    toast.info('Edit functionality - Coming soon!');
    console.log('Edit shipment:', shipment);
  };

  const handleDelete = async (id: string) => {
    if (currentUser?.role !== 'ADMIN') {
      toast.error('Only admins can delete shipments');
      return;
    }
    
    try {
      await deleteShipment({ variables: { id } });
      toast.success('Shipment deleted successfully!');
      refetch();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete shipment');
      console.error('Delete error:', err);
    }
  };

  const handleToggleFlag = async (id: string) => {
    try {
      await toggleFlagShipment({ variables: { id } });
      toast.success('Shipment flag updated!');
      refetch();
    } catch (err) {
      toast.error('Failed to update flag');
      console.error('Toggle flag error:', err);
    }
  };

  const handleShipmentClick = (shipment: Shipment) => {
    setSelectedShipment(shipment);
  };

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (newFilters: ShipmentFilter) => {
    setFilters(newFilters);
    setPagination({ ...pagination, page: 1 });
  };

  if (!isAuthenticated) {
    return (
      <>
        <Auth onSuccess={handleLoginSuccess} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading shipments</h2>
        <p>{error.message}</p>
        <button onClick={() => refetch()} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  const shipments = data?.shipments.shipments || [];
  const paginationData = data?.shipments || {
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  };

  return (
    <div className="app">
      <Header 
        onViewChange={setViewType} 
        currentView={viewType}
        onLogout={handleLogout}
        userName={currentUser?.name}
        userRole={currentUser?.role}
      />
      
      <main className="main-content">
        <div className="content-wrapper">
          <div className="top-bar">
            <div className="top-bar-left">
              <h1>Shipments</h1>
              <span className="shipment-count">
                {paginationData.totalCount} total shipments
              </span>
            </div>
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />
          </div>

          {loading ? (
            <Loading />
          ) : viewType === 'tile' ? (
            <div className="tile-view">
              {shipments.map((shipment: Shipment) => (
                <ShipmentCard
                  key={shipment.id}
                  shipment={shipment}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleFlag={handleToggleFlag}
                  onClick={handleShipmentClick}
                />
              ))}
            </div>
          ) : (
            <ShipmentGrid
              shipments={shipments}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleFlag={handleToggleFlag}
              onClick={handleShipmentClick}
            />
          )}

          <Pagination
            currentPage={paginationData.currentPage}
            totalPages={paginationData.totalPages}
            hasNextPage={paginationData.hasNextPage}
            hasPreviousPage={paginationData.hasPreviousPage}
            onPageChange={handlePageChange}
          />
        </div>
      </main>

      {selectedShipment && (
        <ShipmentDetails
          shipment={selectedShipment}
          onClose={() => setSelectedShipment(null)}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
