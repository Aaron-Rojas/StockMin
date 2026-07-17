import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { COLORS } from '../../themes/colors';

// CÓMO: Convertir FormVenta en el componente del Carrito de Compras interactivo.
// POR QUÉ: SRP. Mantiene aislada la lógica visual y operativa de los ítems seleccionados para la venta, sus cantidades y precios.
export default function FormVenta({ carrito, setCarrito }) {
  
  // CÓMO: Aumentar la cantidad de un ítem en el carrito.
  // POR QUÉ: Otorga facilidad de uso al cajero sin tener que volver a escanear/buscar el producto.
  const incrementarCantidad = (productoId) => {
    setCarrito(prev => 
      prev.map(item => 
        item.productoId === productoId 
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  // CÓMO: Disminuir la cantidad de un ítem (mínimo 1).
  // POR QUÉ: Evita cantidades negativas o inválidas de venta.
  const decrementarCantidad = (productoId) => {
    setCarrito(prev => 
      prev.map(item => 
        item.productoId === productoId && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  };

  // CÓMO: Remover un producto del carrito.
  // POR QUÉ: Permite corregir errores de selección antes de la confirmación financiera.
  const eliminarItem = (productoId) => {
    setCarrito(prev => prev.filter(item => item.productoId !== productoId));
  };

  // CÓMO: Calcular el monto total acumulado.
  // POR QUÉ: Muestra al cajero y al cliente el total de la transacción en tiempo real.
  const total = carrito.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Carrito de Compras 🛒</Text>

      {carrito.length === 0 ? (
        <Text style={styles.emptyText}>El carrito está vacío. Busca productos arriba para agregarlos.</Text>
      ) : (
        <View style={styles.listContainer}>
          {carrito.map(item => (
            <View key={item.productoId} style={styles.cartItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.nombre}</Text>
                <Text style={styles.itemPrice}>Precio Unit: S/ {item.precio.toFixed(2)}</Text>
              </View>

              <View style={styles.itemControls}>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity 
                    style={styles.qtyBtn} 
                    onPress={() => decrementarCantidad(item.productoId)}
                  >
                    <Text style={styles.qtyBtnText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.qtyText || item.cantidad}</Text>
                  <TouchableOpacity 
                    style={styles.qtyBtn} 
                    onPress={() => incrementarCantidad(item.productoId)}
                  >
                    <Text style={styles.qtyBtnText}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity 
                  style={styles.deleteBtn} 
                  onPress={() => eliminarItem(item.productoId)}
                >
                  <Text style={styles.deleteBtnText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Suma total en la parte inferior */}
      <View style={styles.totalDivider} />
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total a Pagar</Text>
        <View style={styles.totalBadge}>
          <Text style={styles.totalText}>S/ {total.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontStyle: 'italic',
  },
  listContainer: {
    gap: 12,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5ECE7',
  },
  itemInfo: {
    flex: 1,
    paddingRight: 10,
  },
  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  itemControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  qtyBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  qtyText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 8,
  },
  deleteBtn: {
    backgroundColor: '#FFF1F2',
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFE0E3',
  },
  deleteBtnText: {
    fontSize: 16,
  },
  totalDivider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 15,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  totalBadge: {
    backgroundColor: '#FFF5F0',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.primary,
    elevation: 1,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  }
});