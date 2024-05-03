const url = process.env.NEXT_PUBLIC_URL

export async function getAll(offset, min, max) {
  const url1 = `${url}/products/all?offset=${offset}&min_price=${min}&max_price=${max}`
  try {
    const res = await fetch(url1, {mode:'no-cors'})

    if (!res.ok) {
      throw {
        message: "Failed to fetch records",
        statusText: res.statusText,
        status: res.status
      }
    }
    const data = await res.json()
    return data.data

  } catch (error) {
    
    console.error("Error fetching all products:", error)
    return [] // Return an empty array in case of an error
  }
}

export async function getDetail(id) {
  
  try {
    const res = await fetch(`${url}/products/${id}`,{mode:'no-cors'})
    if (!res.ok) {
      throw {
        message: "Failed to fetch records",
        statusText: res.statusText,
        status: res.status
      }
    }
    const data = await res.json()
    return data

  } catch (error) {
    
    console.error("Error fetching product:", error)
    return [] // Return an empty array in case of an error
  }
  
}



export async function getLimitedProducts(limit) {

  try {
    const res = await fetch(`${url}/products/all?limit=${limit}`,{mode:'no-cors'})

    if (!res.ok) {
      throw {
        message: "Failed to fetch records",
        statusText: res.statusText,
        status: res.status
      }
    }
    const data = await res.json()
    return data.data

  } catch (error) {
    
    console.error(`Error fetching ${limit} products:`, error)
    return [] // Return an empty array in case of an error
  }
}

export async function getFilteredProducts(min, max) {

  try {
    const res = await fetch(`${url}/products/all?min_price=${min}&max_price=${max}`, {mode:'no-cors'})

    if (!res.ok) {
      throw {
        message: "Failed to fetch records",
        statusText: res.statusText,
        status: res.status
      }
    }
    const data = await res.json()
    return data.data

  } catch (error) {
    
    console.error(`Error fetching ${limit} products:`, error)
    return [] // Return an empty array in case of an error
  }
}

export async function createProduct(newProductData) {
  try {
    const res = await fetch(`${url}/products/create`, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProductData)
    });
    
    if (!res.ok) {
      throw new Error(`Failed to create product: ${res.statusText} (${res.status})`);
    }
    
    const data = await res.json();
    return data;
    
  } catch (error) {
    console.error(`Error creating product:`, error);
    return null; // Return null in case of an error
  }
}

export async function updateProduct(productId, updatedProductData) {
  try {
    const res = await fetch(`${url}/products/${productId}`, {
      mode: 'no-cors',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProductData)
    });
    
    if (!res.ok) {
      throw new Error(`Failed to update product: ${res.statusText} (${res.status})`);
    }
    
    const data = await res.json();
    return data;
    
  } catch (error) {
    console.error(`Error updating product with ID ${productId}:`, error);
    return null; // Return null in case of an error
  }
}

export async function deleteProduct(productId) {
  try {
    const res = await fetch(`${url}/products/${productId}`, {
      mode: 'no-cors',
      method: 'DELETE'
    },{ next: { revalidate: 1 } });

    if (!res.ok) {
      throw new Error(`Failed to delete product: ${res.statusText} (${res.status})`);
    }
    
    return true; // Return true if deletion is successful
    
  } catch (error) {
    console.error(`Error deleting product with ID ${productId}:`, error);
    return false; // Return false in case of an error
  }
}

export async function getOrders() {

  try {
    const res = await fetch(`${url}/orders/all`, {mode:'no-cors'})

    if (!res.ok) {
      throw {
        message: "Failed to fetch records",
        statusText: res.statusText,
        status: res.status
      }
    }
    const data = await res.json()
    return data

  } catch (error) {
    
    console.error(`Error fetching orders:`, error)
    return [] // Return an empty array in case of an error
  }
}

export async function createOrder(newOrderData) {
  try {
    console.log(newOrderData);
    const res = await fetch(`${url}/orders/create`, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOrderData)
    });

    return res;
    
  } catch (error) {
    console.error(`Error creating order:`, error);
    return null; // Return null in case of an error
  }
}

export async function deleteOrder(orderID) {
  try {
    const res = await fetch(`${url}/orders/${orderID}`, {
      mode: 'no-cors',
      method: 'DELETE'
    },{ next: { revalidate: 1 } });

    if (!res.ok) {
      throw new Error(`Failed to delete product: ${res.statusText} (${res.status})`);
    }
    
    return true; // Return true if deletion is successful
    
  } catch (error) {
    console.error(`Error deleting order with ID ${orderID}:`, error);
    return false; // Return false in case of an error
  }
}

export async function updateOrder(orderID, updatedOrderData) {
  try {
    const res = await fetch(`${url}/orders/${orderID}`, {
      method: 'PUT',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedOrderData)
    });
    
    if (!res.ok) {
      throw new Error(`Failed to update product: ${res.statusText} (${res.status})`);
    }
    
    const data = await res.json();
    return data;
    
  } catch (error) {
    console.error(`Error updating order with ID ${orderID}:`, error);
    return null; // Return null in case of an error
  }
}