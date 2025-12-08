````markdown
# API_REFERENCE.md

# 🌐 API Reference

This document provides a complete reference for all authentication, user, vehicle, and booking endpoints in the **vehicle-rental-api** system.

---

# 🔐 Authentication Endpoints

## 1. **User Registration**

**POST** `/api/v1/auth/signup`  
**Access:** Public  
**Description:** Register a new user account.

### Request Body

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "phone": "01712345678",
  "role": "customer"
}
```
````

### Success Response (201)

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "01712345678",
    "role": "customer"
  }
}
```

---

## 2. **User Login**

**POST** `/api/v1/auth/signin`
**Access:** Public
**Description:** Login and receive JWT token.

### Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

### Success Response (200)

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "role": "customer"
    }
  }
}
```

---

# 🚗 Vehicle Endpoints

## 3. **Create Vehicle**

**POST** `/api/v1/vehicles`
**Access:** Admin
**Headers:** `Authorization: Bearer <token>`

### Request Body

```json
{
  "vehicle_name": "Toyota Camry 2024",
  "type": "car",
  "registration_number": "ABC-1234",
  "daily_rent_price": 50,
  "availability_status": "available"
}
```

### Success Response (201)

```json
{
  "success": true,
  "message": "Vehicle created successfully",
  "data": {
    "id": 1,
    "vehicle_name": "Toyota Camry 2024",
    "type": "car",
    "registration_number": "ABC-1234",
    "daily_rent_price": 50,
    "availability_status": "available"
  }
}
```

---

## 4. **Get All Vehicles**

**GET** `/api/v1/vehicles`
**Access:** Public

### Success Response

```json
{
  "success": true,
  "message": "Vehicles retrieved successfully",
  "data": [
    {
      "id": 1,
      "vehicle_name": "Toyota Camry 2024",
      "type": "car",
      "registration_number": "ABC-1234",
      "daily_rent_price": 50,
      "availability_status": "available"
    }
  ]
}
```

### Empty List Response

```json
{
  "success": true,
  "message": "No vehicles found",
  "data": []
}
```

---

## 5. **Get Vehicle by ID**

**GET** `/api/v1/vehicles/:vehicleId`
**Access:** Public

### Example Response

```json
{
  "success": true,
  "message": "Vehicle retrieved successfully",
  "data": {
    "id": 2,
    "vehicle_name": "Honda Civic 2023",
    "type": "car",
    "registration_number": "XYZ-5678",
    "daily_rent_price": 45,
    "availability_status": "available"
  }
}
```

---

## 6. **Update Vehicle**

**PUT** `/api/v1/vehicles/:vehicleId`
**Access:** Admin
**Headers:** Authorization required

### Request Body (Optional Fields)

```json
{
  "vehicle_name": "Toyota Camry 2024 Premium",
  "type": "car",
  "registration_number": "ABC-1234",
  "daily_rent_price": 55,
  "availability_status": "available"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Vehicle updated successfully",
  "data": {
    "id": 1,
    "vehicle_name": "Toyota Camry 2024 Premium",
    "type": "car",
    "registration_number": "ABC-1234",
    "daily_rent_price": 55,
    "availability_status": "available"
  }
}
```

---

## 7. **Delete Vehicle**

**DELETE** `/api/v1/vehicles/:vehicleId`
**Access:** Admin

### Success Response

```json
{
  "success": true,
  "message": "Vehicle deleted successfully"
}
```

---

# 👥 User Endpoints

## 8. **Get All Users**

**GET** `/api/v1/users`
**Access:** Admin

### Success Response

```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890",
      "role": "customer"
    }
  ]
}
```

---

## 9. **Update User**

**PUT** `/api/v1/users/:userId`
**Access:** Admin or the user themselves

### Request Body (Optional)

```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "phone": "+1234567899",
  "role": "customer"
}
```

---

## 10. **Delete User**

**DELETE** `/api/v1/users/:userId`
**Access:** Admin

### Success Response

```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

# 📅 Booking Endpoints

## 11. **Create Booking**

**POST** `/api/v1/bookings`
**Access:** Customer or Admin
**Headers:** Authorization required

### Request Body

```json
{
  "customer_id": 1,
  "vehicle_id": 2,
  "rent_start_date": "2024-01-15",
  "rent_end_date": "2024-01-20"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "id": 1,
    "customer_id": 1,
    "vehicle_id": 2,
    "rent_start_date": "2024-01-15",
    "rent_end_date": "2024-01-20",
    "total_price": 250,
    "status": "active",
    "vehicle": {
      "vehicle_name": "Honda Civic 2023",
      "daily_rent_price": 45
    }
  }
}
```

---

## 12. **Get All Bookings**

**GET** `/api/v1/bookings`
**Access:** Admin sees all, customer sees own bookings

---

## 13. **Update Booking**

**PUT** `/api/v1/bookings/:bookingId`

### Customer Cancel Booking

```json
{
  "status": "cancelled"
}
```

### Admin Mark Returned

```json
{
  "status": "returned"
}
```

### Response (Cancelled)

```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "data": {
    "id": 1,
    "status": "cancelled"
  }
}
```

---

# 🧾 Common Response Structure

### Success

```json
{
  "success": true,
  "message": "Operation description",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Error description",
  "errors": "Details here"
}
```

---

# 🔒 Authorization Header

```
Authorization: Bearer <jwt_token>
```

---

# 💡 Business Logic Notes

### Booking Price Calculation

```
total_price = daily_rent_price × number_of_days
```

### Automatic Updates

- Booked → vehicle status becomes **booked**
- Returned / Cancelled → vehicle becomes **available**
- System auto-returns bookings after end date
- Cannot delete users or vehicles with **active bookings**

---
