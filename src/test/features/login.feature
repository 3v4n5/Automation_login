Feature: Login with 2FA

    Scenario: Successful login with valid credentials and 2FA
        Given the user is on the login page
        When the user enters valid email and password
        And the user enters a valid 2FA code
        And the user submits the 2FA form
        Then the user see the dashboard
    
    Scenario: Failed login with invalid 2FA code 
        Given the user is on the login page
        When the user enters email and password
        And the user enters a invalid 2FA code
        And the user submits the 2FA form
        Then an error message should be displayed indicating invalid credentials

    Scenario: Failed login with empty 2FA code
        Given the user is on the login page
        When the user enters email and password
        And the user leaves the 2FA code field empty
        And the user submits the 2FA form
        Then an error message should be displayed indicating that the 2FA code is required

    Scenario: Failed login with expired 2FA code
        Given the user is on the login page
        When the user enters email and password
        And the user enters an expired 2FA code
        And the user submits the 2FA form
        Then an error message should be displayed indicating that the 2FA code has expired    
    
    
        