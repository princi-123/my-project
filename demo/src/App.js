import React, { useState} from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Box,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Using a data URL for placeholder to avoid network requests
const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

const App = () => {
  const [apiKey, setApiKey] = useState('');
  const [authHeader, setAuthHeader] = useState('');
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    brand: 'all',
    search: ''
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAuth = async () => {
    if (!apiKey) {
      setError('Please enter a valid API key');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const token = `Basic ${btoa(apiKey)}`;
      setAuthHeader(token);
      
      const testResponse = await fetch(
        '/api/inventory?includeLabResults=false&includeRoomQuantities=false',
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': token
          }
        }
      );
      
      if (!testResponse.ok) {
        throw new Error('Invalid API key');
      }
      
      const data = await testResponse.json();
      setInventory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Authentication error:', err);
      setError('Authentication failed. Please check your API key.');
      setAuthHeader('');
    } finally {
      setLoading(false);
    }
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesCategory = filters.category === 'all' || 
      item.category?.toLowerCase() === filters.category.toLowerCase();
    const matchesBrand = filters.brand === 'all' || 
      item.brandName?.toLowerCase().includes(filters.brand.toLowerCase());
    const matchesSearch = !filters.search || 
      item.productName?.toLowerCase().includes(filters.search.toLowerCase());

    return matchesCategory && matchesBrand && matchesSearch;
  });

  const categories = ['all', ...new Set(inventory.map(item => item.category).filter(Boolean))];
  const brands = ['all', ...new Set(inventory.map(item => item.brandName).filter(Boolean))];

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {!authHeader ? (
        <Box sx={{ maxWidth: 400, mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Dutchie Inventory Viewer
          </Typography>
          <TextField
            fullWidth
            label="Enter API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            margin="normal"
          />
          <Button 
            variant="contained" 
            onClick={handleAuth}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Authenticate'}
          </Button>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </Box>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Inventory
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Search Products"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={filters.category}
                  label="Category"
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                >
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Brand</InputLabel>
                <Select
                  value={filters.brand}
                  label="Brand"
                  onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                >
                  {brands.map(brand => (
                    <MenuItem key={brand} value={brand}>
                      {brand === 'all' ? 'All Brands' : brand}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

          <Grid container spacing={3}>
            {filteredInventory.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: 6
                    }
                  }}
                  onClick={() => setSelectedProduct(item)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.imageUrl || placeholderImage}
                    alt={item.productName}
                    sx={{ objectFit: 'contain', p: 2 }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {item.productName || 'Unnamed Product'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Brand: {item.brandName || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Category: {item.category || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {item.quantityAvailable || 0} {item.quantityUnits || 'units'}
                    </Typography>
                    {item.unitPrice && (
                      <Typography variant="body2" color="text.secondary">
                        Price: ${item.unitPrice.toFixed(2)}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Dialog
            open={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
            maxWidth="md"
            fullWidth
          >
            {selectedProduct && (
              <>
                <DialogTitle>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    {selectedProduct.productName}
                    <IconButton onClick={() => setSelectedProduct(null)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </DialogTitle>
                <DialogContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <img
                        src={selectedProduct.imageUrl || placeholderImage}
                        alt={selectedProduct.productName}
                        style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper elevation={0} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Product Details</Typography>
                        <Typography paragraph>{selectedProduct.description || 'No description available.'}</Typography>
                        
                        <Typography variant="subtitle1" gutterBottom>Specifications</Typography>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Typography variant="body2">Brand:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">{selectedProduct.brandName || 'N/A'}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">Category:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">{selectedProduct.category || 'N/A'}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">Strain:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">{selectedProduct.strain || 'N/A'}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">Strain Type:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">{selectedProduct.strainType || 'N/A'}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">Size:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">
                              {selectedProduct.unitWeight ? `${selectedProduct.unitWeight} ${selectedProduct.unitWeightUnit}` : 'N/A'}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">Available Quantity:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">
                              {selectedProduct.quantityAvailable} {selectedProduct.quantityUnits || 'units'}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">Price:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">
                              ${selectedProduct.unitPrice ? selectedProduct.unitPrice.toFixed(2) : 'N/A'}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">SKU:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">{selectedProduct.sku || 'N/A'}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">Package ID:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">{selectedProduct.packageId || 'N/A'}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">Expiration Date:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">{formatDate(selectedProduct.expirationDate)}</Typography>
                          </Grid>
                        </Grid>

                        {selectedProduct.labResults && selectedProduct.labResults.length > 0 && (
                          <>
                            <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>Lab Results</Typography>
                            <Grid container spacing={1}>
                              {selectedProduct.labResults.map((result, index) => (
                                <React.Fragment key={index}>
                                  <Grid item xs={6}>
                                    <Typography variant="body2">{result.labTest}:</Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body2">
                                      {result.value} {result.labResultUnit}
                                    </Typography>
                                  </Grid>
                                </React.Fragment>
                              ))}
                            </Grid>
                          </>
                        )}
                      </Paper>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setSelectedProduct(null)}>Close</Button>
                </DialogActions>
              </>
            )}
          </Dialog>
        </>
      )}
    </Container>
  );
};

export default App;
