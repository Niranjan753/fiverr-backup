'use client';

import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Register custom font
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf'
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Roboto'
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  companyInfo: {
    fontSize: 10,
    marginBottom: 3,
  },
  contact: {
    fontSize: 10,
    marginBottom: 10,
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
    marginBottom: 5,
    backgroundColor: '#f0f0f0',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    paddingVertical: 3,
    backgroundColor: '#fff',
  },
  columnHeader: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  cell: {
    fontSize: 9,
    backgroundColor: '#fff',
  },
  productCode: {
    width: '10%',
    paddingRight: 4,
  },
  productName: {
    width: '30%',
    paddingRight: 4,
  },
  contents: {
    width: '15%',
    paddingRight: 4,
  },
  rateQty: {
    width: '15%',
    textAlign: 'right',
    paddingRight: 4,
  },
  discount: {
    width: '15%',
    textAlign: 'right',
    paddingRight: 4,
  },
  finalRate: {
    width: '15%',
    textAlign: 'right',
    paddingRight: 4,
  },
  categoryHeader: {
    fontSize: 11,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    padding: 5,
    marginTop: 10,
    marginBottom: 5,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 8,
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
});

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface GroupedProducts {
  [category: string]: Product[];
}

interface ProductListPDFProps {
  products: Product[];
  state: string;
  district: string;
}

const ProductListPDF = ({ products, state, district }: ProductListPDFProps) => {
  // Group products by category
  const groupedProducts: GroupedProducts = products.reduce((acc, product) => {
    const category = product.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as GroupedProducts);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>SRT CRACKERS</Text>
          <Text style={styles.companyInfo}>171-A, P.K.N Road, SIVAKASI-626189</Text>
          <Text style={styles.contact}>E-mail: crackerssrt@gmail.com | Phone: 9444652762</Text>
          <Text style={styles.companyInfo}>PRICE LIST</Text>
          <Text style={styles.companyInfo}>Location: {state}{district ? `, ${district}` : ''}</Text>
        </View>

        {Object.entries(groupedProducts).map(([category, categoryProducts]: [string, Product[]]) => (
          <View key={category}>
            <Text style={styles.categoryHeader}>
              {category.toUpperCase()} (80% Discount)
            </Text>

            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={[styles.columnHeader, styles.productCode]}>Product Code</Text>
                <Text style={[styles.columnHeader, styles.productName]}>Product Name</Text>
                <Text style={[styles.columnHeader, styles.contents]}>Contents</Text>
                <Text style={[styles.columnHeader, styles.rateQty]}>Rate / Qty</Text>
                <Text style={[styles.columnHeader, styles.discount]}>Discount</Text>
                <Text style={[styles.columnHeader, styles.finalRate]}>Final Rate</Text>
              </View>

              {categoryProducts.map((product: Product) => {
                const discount = product.price * 0.8; // 80% discount
                const finalRate = product.price - discount;

                return (
                  <View key={product.id} style={styles.tableRow}>
                    <Text style={[styles.cell, styles.productCode]}>{product.id.slice(0, 5)}</Text>
                    <Text style={[styles.cell, styles.productName]}>{product.name}</Text>
                    <Text style={[styles.cell, styles.contents]}>Box</Text>
                    <Text style={[styles.cell, styles.rateQty]}>₹{product.price.toFixed(2)}</Text>
                    <Text style={[styles.cell, styles.discount]}>₹{discount.toFixed(2)}</Text>
                    <Text style={[styles.cell, styles.finalRate]}>₹{finalRate.toFixed(2)}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        ))}

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} / ${totalPages}`}
        />
      </Page>
    </Document>
  );
};

export default ProductListPDF; 