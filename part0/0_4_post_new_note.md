sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: HTTP/1.1 302 Found
    deactivate server
    
    Note right of browser: The browser sends the user input data to the server as application/x-www-form-urlencoded
    Note right of browser: The server adds the user input data to an array called notes
    Note right of browser: The server then asks the browser to perform a new HTTP GET request to the address - /exampleapp/notes

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: The css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: The javascript file
    deactivate server

    Note right of browser: The browser starts executing the javascript code that requests JSON data from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{"content":"brazillll","date":"2026-05-03T19:21:34.447Z"}, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function in the javascript code that renders the notes list with the JSON data

    browser->>server: GET https://studies.cs.helsinki.fi/favicon.ico
    activate server
    server-->>browser: HTTP/1.1 404 Not Found
    deactivate server
