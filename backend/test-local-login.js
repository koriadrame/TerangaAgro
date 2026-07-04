async function testLogin() {
    console.log('Sending test login request to backend...');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

    try {
        const res = await fetch('http://localhost:5000/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier: 'test@test.com',
                password: 'wrongpassword'
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);
        console.log('Status code received:', res.status);
        const data = await res.json();
        console.log('Response body:', JSON.stringify(data, null, 2));
    } catch (err) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
            console.error('❌ Request timed out! The backend is hanging.');
        } else {
            console.error('❌ Connect failed:', err.message);
        }
    }
}

testLogin();
