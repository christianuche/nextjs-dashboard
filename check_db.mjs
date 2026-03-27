import postgres from 'postgres';
const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

async function checkInvoices() {
    try {
        const invoices = await sql`SELECT id FROM invoices LIMIT 5`;
        console.log('Sample Invoices:', invoices);
        if (invoices.length > 0) {
            const id = invoices[0].id;
            const single = await sql`SELECT * FROM invoices WHERE id = ${id}`;
            console.log('Single Fetch Result:', single);
        }
    } catch (error) {
        console.error('DB Check Error:', error);
    } finally {
        await sql.end();
    }
}

checkInvoices();
