sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: {"message":"note created"}
    deactivate server

    Note right of browser: The browser executes the callback function that adds the new user input to the notes list and rerenders the notes list on the page
    Note right of browser: The callback function also sends the user input data to the server as application/JSON
    Note right of browser: The server sends "HTTP/1.1 201 Created" response code to indicate that the request from the browser has led to the creation of a new resource
