# **Grocery App - React Native (RN CLI)** 🛒  

A **Grocery Delivery App** built with **React Native (RN CLI)** featuring:  
✅ **Role-Based Authentication** (User, Admin, Delivery Boy)  
✅ **Order Creation & Management**  
✅ **Razorpay Checkout Integration**  
✅ **Delivery Boy Dashboard**  
✅ **Search & Category Filtering**  
✅ **Live Order Tracking** *(Partially Implemented)*  
✅ **Zustand for State Management**  

---

## **📦 Features**  

### **1. Authentication & Roles**  
- **User Roles:**  
  - 👨‍💼 **Admin** (Manages products, orders, delivery)  
  - 🚴 **Delivery Boy** (Accepts & delivers orders)  
  - 👤 **Customer** (Browse, order, track deliveries)  
- **Login/Logout** with JWT-based sessions.  

### **2. Order System**  
- **Create & Modify Orders**  
- **Order Status Updates** (Pending → Processing → Shipped → Delivered)  
- **Order History** for customers.  

### **3. Razorpay Checkout**  
- Secure payment gateway integration.  
- Success/Failure handling.  

### **4. Delivery Boy Dashboard**  
- View assigned orders.  
- Update delivery status.  
- *(Live Tracking was attempted but not fully functional due to resource constraints.)*  

### **5. Search & Categories**  
- 🔍 **Search products** by name.  
- 🏷️ **Filter by categories** (e.g., Fruits, Vegetables, Dairy).  

### **6. State Management (Zustand)**  
- Global state for:  
  - User authentication  
  - Cart items  
  - Order tracking  

---

## **⚙️ Setup & Installation**  

### **Prerequisites**  
- Node.js (v16+)  
- React Native CLI (`npx react-native@latest init`)  
- Android Studio / Xcode (for emulator)  
  
- Razorpay API keys  

### **Steps**  
1. **Clone the repo**  
   ```sh
   git clone https://github.com/yourusername/grocery-app.git
   cd grocery-app
   ```
2. **Install dependencies**  
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables**  
   - Create `.env` file:  
     ```
     RAZORPAY_KEY=your_razorpay_key
     API_BASE_URL=your_backend_url
     ```
4. **Run the app**  
   ```sh
   npx react-native run-android
   # or
   npx react-native run-ios
   ```

---

## **🚧 Known Issues**  
- **Live Tracking Not Fully Working**  
  - Issue: Resource allocation problem during development.  
  - Temporary Fix: Manual status updates by delivery boy.  
- **Occasional UI Glitches**  
  - Workaround: Restart the app.  

---

## **📂 Project Structure**  
```
src/  
├── components/      # Reusable UI components  
├── screens/         # App screens (Home, Cart, Orders, etc.)  
├── store/           # Zustand state management  
├── utils/           # Helper functions (API calls, auth)  
├── navigation/      # Stack & Tab navigation  
└── assets/          # Images, icons, fonts  
```

---

## **📜 License**  
MIT © [Your Name]  

---

## **📌 Notes**  
- This app was built with **RN CLI** (not Expo).  
- **Zustand** was chosen for lightweight state management.  
- **Backend API** is required (Node.js/Firebase/any REST API).  

---

**🚀 Happy Coding!**  
Let me know if you need improvements! 🔥
