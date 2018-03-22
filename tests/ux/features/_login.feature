Feature: Log in
    As an user
    I should be able to log in

Scenario: Open Experience Cloud Analytics
    Given I open the url "http://localhost:8080/web/analytics"

Scenario: Log In
	When  I wait on element "#_com_liferay_login_web_portlet_LoginPortlet_loginForm"
    And   I set "test@liferay.com" to the inputfield "#_com_liferay_login_web_portlet_LoginPortlet_login"
    And   I set "test" to the inputfield "#_com_liferay_login_web_portlet_LoginPortlet_password"
    And   I click on the element "#_com_liferay_login_web_portlet_LoginPortlet_loginForm .btn-primary"
    And   I wait on element "#analyticsApp"
    Then  I expect that element "#analyticsApp .analytics-header" is visible