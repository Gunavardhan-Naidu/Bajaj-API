document.getElementById('submitBtn').addEventListener('click', function() {
    const jsonInput = document.getElementById('jsonInput').value;
    const errorElement = document.getElementById('error');
    const dropdownContainer = document.getElementById('dropdownContainer');
    const resultContainer = document.getElementById('resultContainer');

    try {
        // Validate JSON
        const parsedJson = JSON.parse(jsonInput);
        errorElement.textContent = '';
        dropdownContainer.classList.remove('hidden');

        // API call
        // Replace 'your-api-endpoint' with your actual API endpoint
        fetch('your-api-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parsedJson)
        })
        .then(response => response.json())
        .then(data => {
            const options = Array.from(document.getElementById('options').selectedOptions).map(option => option.value);
            let result = {};

            // Logic to filter response based on selected options
            if (options.includes('alphabets')) {
                result.alphabets = data.alphabets;
            }
            if (options.includes('numbers')) {
                result.numbers = data.numbers;
            }
            if (options.includes('highestLowercase')) {
                result.highestLowercase = data.highestLowercase;
            }

            // Display result
            document.getElementById('result').textContent = JSON.stringify(result, null, 2);
            resultContainer.classList.remove('hidden');
        });
    } catch (e) {
        errorElement.textContent = 'Invalid JSON format';
        dropdownContainer.classList.add('hidden');
        resultContainer.classList.add('hidden');
    }
});
