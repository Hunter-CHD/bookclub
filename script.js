// Replace with your published CSV link
const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSsBpRJk3z9m1ANMXBrynWofvBSgdJaVnKUgYttD8K-dR_pqVQY0EnGNwt0cGDtH4zakSm_DjOXM8jA/pub?output=csv';

async function loadBooks() {
  try {
    const res = await fetch(sheetURL);
    const csvText = await res.text();

    // Parse CSV manually (simple split)
    const rows = csvText.trim().split('\n').map(row => row.split(','));

    const header = rows[0]; // ['Title', 'Author', 'Status']
    const data = rows.slice(1);

    const container = document.getElementById('book-list');
    container.innerHTML = ''; // clear loading text

    data.forEach(row => {
      const [title, author, status] = row;
      const card = document.createElement('div');
      card.className = 'book-card';
      card.innerHTML = `
        <h2>${title}</h2>
        <p><strong>Author:</strong> ${author}</p>
        <p><strong>Status:</strong> ${status}</p>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error('Error loading sheet:', err);
    document.getElementById('book-list').textContent = 'Failed to load books.';
  }
}

loadBooks();
