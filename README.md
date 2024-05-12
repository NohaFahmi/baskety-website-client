![image](https://github.com/NohaFahmi/baskety-website-client/assets/33437197/dd10e833-59af-42f3-8c30-3b0dd3c2bbe9)

**[Basket App](https://baskety-website-client.vercel.app/app/home)**

**Introduction:**

---

This document outlines the structure, features, and user interface components of the Basket website, a platform designed to facilitate online shopping and organization of shopping lists. Whether you're a user browsing items, managing your shopping lists, or analyzing your shopping history, this documentation will guide you through the various pages and functionalities of the website.

---

**Index:**

Welcome to the Basket website design documentation! This document outlines the structure, features, and user interface components of the Basket website, a platform designed to facilitate online shopping and organization of shopping lists. Whether you're a user browsing items, managing your shopping lists, or analyzing your shopping history, this documentation will guide you through the various pages and functionalities of the website.

---

### Website pages:

**1. Homepage: /home**

The homepage serves as the entry point to the Basket website. It comprises several key components:

- **Sidebar**: Includes the website logo and navigation links to different pages such as the home page, history page, and stats page. Additionally, it features a basket icon that displays the count of items in the current shopping list and allows users to open the list in mobile design.
- **Search Field + Page Title**: Enables users to search for specific items and provides a clear title for the page.
- **Items List Section**: Displays items grouped by category to facilitate easy browsing.
- **Item Element**: Each item in the list displays its name and a plus icon. Clicking on the item name reveals its details, while clicking the plus icon adds it to the current shopping list.

screenshots:

![home-page-2.png](https://github.com/NohaFahmi/baskety-website-client/blob/master/src/assets/screenshots/home-page-2.png)

---

---

**2. Shopping List Views (Right Side):**

This section, positioned on the right side of the page on desktop and occupying the full width on mobile, offers multiple views based on user actions:

- **Item Details View**: Detailed information about a selected item.
- **Add New Item View**: Form for adding a new item to the shopping list.
- **Current Shopping View**: Overview of the current shopping list.

### Views

**1. Item Details Page:**

This page provides detailed information about a specific item. It includes:

- **Item Image**: Visual representation of the item.
- **Item Name**: Name of the item.
- **Item Category**: Category to which the item belongs.
- **Item Note**: Description or additional information about the item.
- **Delete Button**: Allows users to delete the item from the database.
- **Add to List Button**: Adds the item to the current shopping list.
- **Back Button**: Navigates users back to the shopping list page.
- **Edit Button**: Opens the item form in edit mode for making modifications.

screenshots:

![home-page-item-details.png](https://github.com/NohaFahmi/baskety-website-client/blob/master/src/assets/screenshots/home-page-item-details.png)

---

**2. Add New / Edit Existing Item Page:**

This page enables users to add a new item to the database or edit an existing item. It features a form with the following fields:

- **Name**: Name of the item.
- **Note (Optional)**: Additional information about the item.
- **Image (Optional)**: Visual representation of the item.
- **Category (Dropdown List)**: Category to which the item belongs.
- **Price**: Price of the item.
- **Cancel Button**: Closes the form without saving changes.
- **Save Button**: Saves the changes and closes the form.

Upon closing the form, users are navigated either to the item details page (edit mode) or the shopping list view (add mode).

screenshots:

![home-page-add-item-form.png](https://github.com/NohaFahmi/baskety-website-client/blob/master/src/assets/screenshots/home-page-add-item-form.png)

---

**3. Shopping List Page:**

The shopping list page allows users to manage their shopping lists efficiently. It consists of the following elements:

- **Empty Shopping List Screen**: Default view with options to add items and name the list.
- **List with Items**: Once items are added, they are displayed grouped by category.
- **Banner for Adding Items**: Persists throughout the session.
- **Field for List Name**: Enables users to name the list and save changes.
- **Edit and Complete Buttons**: Allow users to edit the list title, mark the list as complete, and navigate to an empty screen.
- **Item Display**: Each item on the list shows its name, price, a checkbox to mark as complete, and a button to update the item count or remove it from the list.
- **Total Price Display**: Shows the total price of items on the list, continuously updated.

screenshots

![list-details-page.png](https://github.com/NohaFahmi/baskety-website-client/blob/master/src/assets/screenshots/list-details-page.png)

---

**3. History Page: /history**

The history page provides users with a record of their past shopping lists. It includes:

- **Title**: "Shopping History" to indicate the purpose of the page.
- **List of Previous Shopping Lists**: Grouped by month and year.
- **List Card**: Displays list name, creation/update date, total price, status (completed/cancelled), and an arrow button to view list details.

screenshots:

![history-page.png](https://github.com/NohaFahmi/baskety-website-client/blob/master/src/assets/screenshots/history-page.png)

---

**4. List Details Page:**

This page displays detailed information about a specific shopping list, including:

- **Back Button**: Allows users to return to the history page.
- **List Title**: Name of the list.
- **Dates**: Creation and update dates.
- **Status**: Indicates whether the list is completed or cancelled.
- **Total Price**: Sum of all items on the list.
- **Items Grouped by Category**: Provides a clear overview of the list's contents.

screenshots:

![list-details-page.png](https://github.com/NohaFahmi/baskety-website-client/blob/master/src/assets/screenshots/list-details-page.png)

---

**5. Stats Page: /stats**

The stats page offers insights into users' shopping habits and preferences. It includes:

- **Top Items Added to Lists**: Displays the top three items added by users.
- **Top Categories Added to Lists**: Shows the top three categories based on user activity.
- **Monthly Summary**: Presents a summary of items added to lists each month, allowing users to filter by categories, items, and expenditure.

screenshots:

![stats-page.png](https://github.com/NohaFahmi/baskety-website-client/blob/master/src/assets/screenshots/stats-page.png)

---

**9. Login Page: /auth/login**

This page provides users with a secure login process. It features fields for entering email and password, as well as a login button.

screenshots:

![login-desktop.png](https://github.com/NohaFahmi/baskety-website-client/blob/master/src/assets/screenshots/login-desktop.png)

---

**10. Signup Page: /auth/signup**

The signup page allows new users to create an account. It includes fields for entering email, password, confirm password, and username, as well as a signup button. Additionally, users can sign up using their Gmail account.

screenshots:

![signup-page.png](https://github.com/NohaFahmi/baskety-website-client/blob/master/src/assets/screenshots/signup-page.png)
