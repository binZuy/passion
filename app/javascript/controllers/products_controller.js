import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="products"
export default class extends Controller {
  static values = { size: String, product: Object }

  addToCart() {
    console.log("product: ", this.productValue)
    const cart = localStorage.getItem("cart")
    if (cart) {
      const cartArray = JSON.parse(cart)
      const foundIndex = cartArray.findIndex(item => item.id === this.productValue.id && item.size === this.sizeValue)
      if (foundIndex >= 0) {
        cartArray[foundIndex].quantity = parseInt(cartArray[foundIndex].quantity) + 1
        this.showNotification(`Updated quantity of ${this.productValue.name} in cart`, "success")
      } else {
        cartArray.push({
          id: this.productValue.id,
          name: this.productValue.name,
          price: this.productValue.price,
          size: this.sizeValue,
          quantity: 1
        })
      }
      this.showNotification(`Added ${this.productValue.name} to cart`, "success")
      localStorage.setItem("cart", JSON.stringify(cartArray))
    } else {
      const cartArray = []
      cartArray.push({
        id: this.productValue.id,
        name: this.productValue.name,
        price: this.productValue.price,
        size: this.sizeValue,
        quantity: 1
      })
      this.showNotification(`Added ${this.productValue.name} to cart`, "success")
      localStorage.setItem("cart", JSON.stringify(cartArray))
    }
  }

  selectSize(e) {
    this.sizeValue = e.target.value
    const selectedSizeEl = document.getElementById("selected-size") 
    selectedSizeEl.innerText = `Selected Size: ${this.sizeValue}`
  }

  showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div')
    notification.classList.add(
      'fixed', 'top-4', 'right-4', 'px-4', 'py-2', 'rounded-md', 'text-white', 'shadow-md', 'z-50'
    )

    // Add class based on success or error type
    if (type === "success") {
      notification.classList.add('bg-green-500')
    } else {
      notification.classList.add('bg-red-500')
    }

    notification.textContent = message

    // Append notification to body and remove after 3 seconds
    document.body.appendChild(notification)
    setTimeout(() => {
      notification.remove()
    }, 3000)
  }
}
