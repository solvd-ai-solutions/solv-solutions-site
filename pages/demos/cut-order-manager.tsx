import { useState, useEffect } from 'react';
import Head from 'next/head';

interface CutOrder {
  id: string;
  customerName: string;
  material: string;
  dimensions: string;
  quantity: number;
  qrCode: string;
  status: 'pending' | 'cutting' | 'ready' | 'completed';
  priority: 'normal' | 'rush';
  timestamp: Date;
  estimatedCompletion: Date;
}

export default function CutOrderManagerDemo() {
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'analytics'>('orders');
  const [orders, setOrders] = useState<CutOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<CutOrder | null>(null);

  // Initialize with demo data
  useEffect(() => {
    const demoOrders: CutOrder[] = [
      {
        id: 'ORD-001',
        customerName: 'John Smith',
        material: '2x4 Pine Lumber',
        dimensions: '8ft → 4 pieces @ 2ft each',
        quantity: 4,
        qrCode: 'QR001',
        status: 'cutting',
        priority: 'rush',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        estimatedCompletion: new Date(Date.now() + 30 * 60 * 1000)
      },
      {
        id: 'ORD-002',
        customerName: 'Sarah Wilson',
        material: 'Plywood 3/4"',
        dimensions: '4x8 sheet → Custom sizes',
        quantity: 3,
        qrCode: 'QR002',
        status: 'ready',
        priority: 'normal',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        estimatedCompletion: new Date(Date.now() - 15 * 60 * 1000)
      },
      {
        id: 'ORD-003',
        customerName: 'Mike Johnson',
        material: 'Cedar Deck Boards',
        dimensions: '12ft → 6 pieces @ 2ft each',
        quantity: 6,
        qrCode: 'QR003',
        status: 'pending',
        priority: 'normal',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        estimatedCompletion: new Date(Date.now() + 90 * 60 * 1000)
      }
    ];

    setOrders(demoOrders);
  }, []);

  const updateOrderStatus = (orderId: string, newStatus: CutOrder['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#F29E8E';
      case 'cutting': return '#B4E7CE';
      case 'ready': return '#A8D8EA';
      case 'completed': return '#D1C4E9';
      default: return '#666';
    }
  };

  const getPriorityColor = (priority: string) => {
    return priority === 'rush' ? '#FF6B6B' : '#4ECDC4';
  };

  return (
    <>
      <Head>
        <title>Cut & Order Manager Demo - Solvd AI Solutions</title>
        <meta name="description" content="Hardware store cutting service management system with QR tracking and inventory automation." />
        <meta property="og:title" content="Cut & Order Manager Demo" />
        <meta property="og:description" content="Hardware store cutting service management system with QR tracking and inventory automation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.solvdaisolutions.com/demos/cut-order-manager" />
      </Head>
      
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: 'Inter, sans-serif'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          borderBottom: '2px solid #000',
          padding: '16px 24px',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h1 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#000',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                🔨 Cut & Order Manager
                <span style={{
                  fontSize: '12px',
                  backgroundColor: '#F29E8E',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontWeight: '500'
                }}>
                  DEMO
                </span>
              </h1>
              <p style={{
                fontSize: '14px',
                color: '#666',
                margin: '4px 0 0 0'
              }}>
                Hardware Store Cutting Service Management
              </p>
            </div>
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}>
              <div style={{
                fontSize: '14px',
                color: '#666'
              }}>
                🕐 {new Date().toLocaleTimeString()}
              </div>
              <div style={{
                backgroundColor: '#A8D8EA',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Station 1 Active
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #eee',
          padding: '0 24px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            gap: '32px'
          }}>
            {(['orders', 'inventory', 'analytics'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '16px 0',
                  fontSize: '16px',
                  fontWeight: '500',
                  color: activeTab === tab ? '#000' : '#666',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab ? '3px solid #F29E8E' : '3px solid transparent',
                  textTransform: 'capitalize'
                }}
              >
                {tab === 'orders' && '📋'} {tab === 'inventory' && '📦'} {tab === 'analytics' && '📊'} {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px'
        }}>
          
          {activeTab === 'orders' && (
            <div style={{ display: 'flex', gap: '24px' }}>
              {/* Orders List */}
              <div style={{ flex: 2 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}>
                  <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>
                    Active Orders ({orders.filter(o => o.status !== 'completed').length})
                  </h2>
                  <button style={{
                    backgroundColor: '#F29E8E',
                    color: 'white',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>
                    + New Order
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      style={{
                        backgroundColor: 'white',
                        border: selectedOrder?.id === order.id ? '2px solid #F29E8E' : '2px solid transparent',
                        borderRadius: '12px',
                        padding: '16px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontWeight: '600', fontSize: '16px' }}>{order.id}</span>
                            <span style={{
                              backgroundColor: getPriorityColor(order.priority),
                              color: 'white',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}>
                              {order.priority.toUpperCase()}
                            </span>
                          </div>
                          <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                            👤 {order.customerName}
                          </div>
                          <div style={{ fontSize: '14px', color: '#333' }}>
                            📏 {order.material}
                          </div>
                        </div>
                        <div style={{
                          backgroundColor: getStatusColor(order.status),
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '500',
                          textTransform: 'uppercase'
                        }}>
                          {order.status}
                        </div>
                      </div>
                      
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                        🔲 {order.dimensions}
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          QR: {order.qrCode} | Qty: {order.quantity}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          ETA: {order.estimatedCompletion.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Details Panel - I'll add this in the next part */}
              <div style={{ flex: 1 }}>
                {selectedOrder ? (
                  <div style={{
                    backgroundColor: 'white',
                    border: '2px solid #000',
                    borderRadius: '12px',
                    padding: '20px'
                  }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                      Order Details
                    </h3>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Order ID</div>
                      <div style={{ fontSize: '16px', fontWeight: '500' }}>{selectedOrder.id}</div>
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Customer</div>
                      <div style={{ fontSize: '16px', fontWeight: '500' }}>{selectedOrder.customerName}</div>
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Material & Cuts</div>
                      <div style={{ fontSize: '14px', marginBottom: '4px' }}>{selectedOrder.material}</div>
                      <div style={{ fontSize: '14px', color: '#333' }}>{selectedOrder.dimensions}</div>
                    </div>
                    
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>QR Code</div>
                      <div style={{
                        backgroundColor: '#f8f9fa',
                        border: '2px dashed #ccc',
                        borderRadius: '8px',
                        padding: '20px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '48px', marginBottom: '8px' }}>📱</div>
                        <div style={{ fontSize: '16px', fontWeight: '500' }}>{selectedOrder.qrCode}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>Scan to track</div>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Update Status</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {(['pending', 'cutting', 'ready', 'completed'] as const).map((status) => (
                          <button
                            key={status}
                            onClick={() => updateOrderStatus(selectedOrder.id, status)}
                            style={{
                              backgroundColor: selectedOrder.status === status ? getStatusColor(status) : 'white',
                              color: selectedOrder.status === status ? 'white' : '#333',
                              border: `2px solid ${getStatusColor(status)}`,
                              padding: '8px 12px',
                              borderRadius: '6px',
                              fontSize: '14px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              textTransform: 'capitalize'
                            }}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    backgroundColor: 'white',
                    border: '2px solid #000',
                    borderRadius: '12px',
                    padding: '40px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
                    <div style={{ fontSize: '16px', color: '#666' }}>
                      Select an order to view details
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div style={{
              backgroundColor: 'white',
              border: '2px solid #000',
              borderRadius: '12px',
              padding: '40px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                Inventory Management
              </h3>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Automated stock tracking and reorder alerts
              </p>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div style={{
              backgroundColor: 'white',
              border: '2px solid #000',
              borderRadius: '12px',
              padding: '40px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                Analytics Dashboard
              </h3>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Performance metrics and business insights
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          backgroundColor: 'white',
          borderTop: '2px solid #000',
          padding: '20px 24px',
          marginTop: '40px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
              This is a demo of the Cut & Order Manager system. 
              <a 
                href="https://www.solvdaisolutions.com" 
                style={{ color: '#F29E8E', textDecoration: 'none', marginLeft: '8px' }}
              >
                Contact us to build your custom solution →
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}