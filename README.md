# Shopito 🛒

An end-to-end e‑commerce application with **user panel** and **admin panel**, built using:

- **Backend**: Spring Boot (REST APIs, JWT authentication with RSA256, MySQL)
- **Frontend**: React + Vite + Material-UI
- **Database**: MySQL
- **Auth**: JWT-based login & role-based access control
- **Deployment**: Docker-ready

---

## 📂 Project Structure

```
shopito/
├─ frontEnd/        # React frontend (Vite + MUI)
│  ├─ src/          # Components, pages, routes
│  └─ public/       # Static assets
├─ backend/         # Spring Boot backend (REST APIs, JWT, MySQL)
│  ├─ src/main/java # Application code
│  └─ src/main/resources # Config, keys
├─ uploads/         # Uploaded product/user images
├─ screenshots/     # Documentation screenshots
├─ docker-compose.yml (planned) # Container orchestration
└─ README.md        # Project documentation
```

## 🚀 Getting Started

### Backend (Spring Boot)

```bash
cd MyShopping
mvn spring-boot:run
```

### Configure environment in application.properties:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/myshopping
spring.datasource.username=your_db_user
spring.datasource.password=your_db_pass

# JWT RSA256 keys
jwt.private-key=classpath:private.pem
jwt.public-key=classpath:public.pem

# Email configuration
spring.mail.host=smtp.yourprovider.com
spring.mail.username=your_email
spring.mail.password=your_email_password
```

### Frontend (React + Vite)

```bash
cd frontEnd
npm install
npm run dev
Frontend runs on http://localhost:5173
```

### Set API base URL in .env:

```env
VITE_API_BASE_URL=http://localhost:8080/v1/api
```

## 🔑 Authentication Flow

- Login → `/v1/api/auth/token` returns JWT.

- JWT stored in frontend (localStorage/session).

- Protected routes attach `Authorization: Bearer <token>` header.

- Role-based access: USER vs ADMIN.

## 🔐 Security

- **JWT tokens** are signed with **RSA256** using a private key.

- Verification is done with the corresponding **public key**.

- This ensures tokens cannot be forged and adds stronger security for user sessions.

- **Role-based access control** is enforced via JWT claims (`USER`, `ADMIN`).

## ⚡ Performance Optimizations

- **Lazy loading** is used for non-critical frontend routes to reduce initial bundle size.

- **Critical pages** (Products, Cart) are eagerly loaded for faster access.

- This improves performance and user experience, especially on slower networks.

## 📧 Email Notifications

### Password Reset

- Users request reset via `POST /v1/api/auth/forgot-password`.

- Backend generates a reset token and emails it to the user.

- Token used with `POST /v1/api/auth/reset-password` to set a new password.

### Password Change Confirmation

- When a logged-in user changes their password via `POST /v1/api/users/profile/change-password`, a confirmation email is sent to their registered email address.

- This ensures account security and alerts users to unauthorized changes.

## 📌 API Endpoints

### User Controller

| Method | Endpoint                              | Description                |
| ------ | ------------------------------------- | -------------------------- |
| POST   | /v1/api/users/register                | Register new user          |
| GET    | /v1/api/users/profile                 | Get logged-in user profile |
| POST   | /v1/api/users/profile/change-password | Change password            |
| PUT    | /v1/api/users/profile/update          | Update profile             |
| GET    | /v1/api/users/{id}/profile            | Get user profile by ID     |
| GET    | /v1/api/users                         | List all users             |
| DELETE | /v1/api/users/{id}                    | Delete user                |

### Product Controller

| Method | Endpoint                         | Description            |
| ------ | -------------------------------- | ---------------------- |
| GET    | /v1/api/products                 | List all products      |
| GET    | /v1/api/products/{id}            | Get product by ID      |
| GET    | /v1/api/products/search          | Search products        |
| POST   | /v1/api/products                 | Add product            |
| POST   | /v1/api/products/upload          | Upload product image   |
| POST   | /v1/api/products/upload-multiple | Upload multiple images |
| POST   | /v1/api/products/addWithImage    | Add product with image |
| PUT    | /v1/api/products/update/{id}     | Update product         |
| DELETE | /v1/api/products/delete/{id}     | Delete product         |

### Cart Controller

| Method | Endpoint                       | Description             |
| ------ | ------------------------------ | ----------------------- |
| GET    | /v1/api/cart-items/user        | Get current user cart   |
| POST   | /v1/api/cart-items             | Add item to cart        |
| POST   | /v1/api/cart-items/updateOrAdd | Update or add item      |
| PUT    | /v1/api/cart-items/increment   | Increment item quantity |
| PUT    | /v1/api/cart-items/decrement   | Decrement item quantity |
| DELETE | /v1/api/cart-items/user        | Clear cart              |

### Order Controller

| Method | Endpoint                       | Description           |
| ------ | ------------------------------ | --------------------- |
| GET    | /v1/api/orders                 | List all orders       |
| GET    | /v1/api/orders/{id}            | Get order by ID       |
| GET    | /v1/api/orders/user/{userId}   | Get orders by user    |
| POST   | /v1/api/orders                 | Place order           |
| POST   | /v1/api/orders/place-from-cart | Place order from cart |
| DELETE | /v1/api/orders/{id}            | Cancel order          |

### Admin Controller

| Method | Endpoint                          | Description                    |
| ------ | --------------------------------- | ------------------------------ |
| GET    | /v1/api/admin/users               | List all users                 |
| PUT    | /v1/api/admin/users/{userId}/role | Update user role               |
| GET    | /v1/api/admin/products            | List all products (admin view) |
| GET    | /v1/api/admin/dashboard           | Admin dashboard stats          |

_(Other controllers: payments, invoices, order-items, admin-orders — follow similar pattern.)_

## 🖥️ Frontend Routes

| Route            | Page / Description |
| ---------------- | ------------------ |
| `/`              | HomePage           |
| `/products`      | Product listing    |
| `/product/:id`   | Product details    |
| `/cart`          | Cart page          |
| `/orders`        | User orders        |
| `/profile`       | User profile       |
| `/admin`         | Admin dashboard    |
| `/admin/profile` | Admin profile      |
| `/login`         | Login              |
| `/signup`        | Signup             |
| `/logout`        | Logout             |

## 📦 Features

- **User authentication**: Registration & login with JWT (RSA256)
- **Profile management**: Update details, change password
- **Email notifications**: Password reset & change confirmations
- **Product catalog**: Search, add, and upload product images
- **Cart & checkout flow**: Seamless shopping experience
- **Order management**: Placement, tracking, and invoices
- **Admin panel**: Manage users, products, and orders
- **Performance**: Lazy loading for non‑critical routes

## 🌙 Night Mode

- **Dark theme support** for improved readability in low‑light environments
- **Automatic detection** based on system preferences (`prefers-color-scheme`)
- **Manual toggle** available in the UI for user control
- Ensures consistent styling across components (React + MUI)
- Enhances accessibility and user comfort during extended usage

## 🐳 Dockerization (Planned)

You can add Docker support with:

- **Backend**: Dockerfile for Spring Boot JAR
- **Frontend**: Dockerfile for Vite build → Nginx serve
- **Compose**: `docker-compose.yml` to run backend, frontend, and MySQL together

### Example `docker-compose.yml`

```yaml
version: "3.8"
services:
  backend:
    build: ./MyShopping
    ports:
      - "8080:8080"
    environment:
      - DB_URL=jdbc:mysql://db:3306/myshopping
      - DB_USER=root
      - DB_PASS=secret
      - JWT_PRIVATE_KEY=/keys/private.pem
      - JWT_PUBLIC_KEY=/keys/public.pem
    depends_on:
      - db

  frontend:
    build: ./frontEnd
    ports:
      - "5173:5173"

  db:
    image: mysql:8
    environment:
      MYSQL_DATABASE: myshopping
      MYSQL_ROOT_PASSWORD: secret
    ports:
      - "3306:3306"
```

### 💳 Planned Features (Next Version)

- **Payment Gateway Integration**  
  Secure checkout with **Razorpay/Stripe**.

- **Backend verification via webhooks**  
  Ensures transactions are validated securely.

- **Order status updates**  
  Orders are marked as _Paid_ after successful transaction.

- **Email confirmations**  
  Users receive a confirmation email after payment.

## 📸 Screenshots

### Authentication flow

### 🔐 Authentication Flow

| Before Login                                             | Login                                | Signup                                 |
| -------------------------------------------------------- | ------------------------------------ | -------------------------------------- |
| ![Before Login](screenshots/Home_page_without_login.png) | ![Login](screenshots/login_page.png) | ![Signup](screenshots/signup_page.png) |

---

### 👤 User Journey

| After Login                                           | Product Details                                          | Cart                               |
| ----------------------------------------------------- | -------------------------------------------------------- | ---------------------------------- |
| ![After Login](screenshots/home_page_after_login.png) | ![Product Details](screenshots/product_details_page.png) | ![Cart](screenshots/user_cart.png) |

---

### 📦 Orders & Checkout

| My Orders                                    | Checkout                                    | Order Confirmation                                        |
| -------------------------------------------- | ------------------------------------------- | --------------------------------------------------------- |
| ![My Orders](screenshots/my_orders_page.png) | ![Checkout](screenshots/my_orders_page.png) | ![Order Confirmation](screenshots/Order_confirmation.png) |

---

### 🔑 Account Management

| Edit Profile                                          | Forgot Password                                     |
| ----------------------------------------------------- | --------------------------------------------------- |
| ![Edit Profile](screenshots/profile_edit_profile.png) | ![Forgot Password](screenshots/forgot_password.png) |

---

### 🔎 Search & Invoice

| Search Dropdown (Homepage)                                        | Search Results                                           | Standard Invoice                                             |
| ----------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| ![Search Dropdown](screenshots/products_page_search_dropdown.png) | ![Search Results](screenshots/search_product_result.png) | ![Standard Invoice](screenshots/standard_invoice_in_pdf.png) |

---

### 🛠️ Admin Features

| User Management                                           | Update User Role                                                       | Product Management                                               |
| --------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------- |
| ![User Management](screenshots/admin_user_management.png) | ![Update User Role](screenshots/admin_user_management_update_role.png) | ![Product Management](screenshots/admin_products_management.png) |

| Product Edit/View                                                        | Add Product                                               | Orders                                  |
| ------------------------------------------------------------------------ | --------------------------------------------------------- | --------------------------------------- |
| ![Product Edit/View](screenshots/admin_products_management_editView.png) | ![Add Product](screenshots/admin_product_add_product.png) | ![Orders](screenshots/admin_orders.png) |

| Orders View/Edit Status                                                   |
| ------------------------------------------------------------------------- |
| ![Orders View/Edit Status](screenshots/admin_orders_view_edit_status.png) |

---

### Light vs Dark Mode

| Light Mode                                                             | Dark Mode                                                                  |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| ![Light Mode](screenshots/home_page_after_login.png)                   | ![Dark Mode](screenshots/home_page_night_mode.png)                         |
| ![Light Mode products](screenshots/Home_page_after_scrolling_down.png) | ![Dark Mode products](screenshots/products_page_night_mode.png)            |
| ![Products Details](screenshots/product_details_page.png)              | ![Products Details Night](screenshots/product_details_page_night_mode.png) |
| ![My Orders](screenshots/my_orders_page.png)                           | ![My Orders Night](screenshots/my_orders_page_night_mode.png)              |

## 🛠️ Development Notes

- **Backend** runs on: [http://localhost:8080](http://localhost:8080)
- **Frontend** runs on: [http://localhost:5173](http://localhost:5173)
- **Uploads** stored in: `/uploads` folder
- **Database**: Ensure MySQL is running locally with schema `myshopping`

## ⚙️ Environment Samples

### Backend Keys

- Place `private.pem` and `public.pem` in `src/main/resources/`
- Or mount them via Docker for containerized deployments

### Frontend `.env`

```env
VITE_API_BASE_URL=http://localhost:8080/v1/api
```

## 🤝 Contributing

- Fork the repository and create feature branches (e.g., feature/payment-gateway)

- Commit in logical chunks with clear, descriptive messages

- Open Pull Requests with detailed descriptions

- Include screenshots if your changes affect the UI
