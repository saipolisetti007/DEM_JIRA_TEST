import os
import sys
from jira import JIRA

# Check if a version was provided as a command-line argument
# version = sys.argv[1] if len(sys.argv) > 1 else "1.0" 

# Configure JIRA client
jira_options = {'server': os.getenv('JIRA_URL')}
jira = JIRA(
    options=jira_options,
    basic_auth=(os.getenv('JIRA_EMAIL'), os.getenv('JIRA_API_TOKEN'))
)
# Get repository name from the environment variable
repo_name = os.getenv('GITHUB_REPOSITORY').split('/')[-1]

# Determine allowed components based on the repository
allowed_components = {
    # 'DEM_ADB': {'Backend', 'Data', 'Front End'},
    # 'DEM_API': {'API', 'Data', 'Front End'},
    'DEM_UI': {'UI', 'Data', 'Front End'}
}.get(repo_name, set())

# Construct JQL query based on whether a version is provided
# if version:
    # jql_query = f'fixVersion = "{version}" AND status = "DONE" AND issuetype in (Epic, Bug) ORDER BY key ASC'
# else:
jql_query = 'status = "DONE" AND issuetype in (Epic, Bug) ORDER BY key ASC'

print(f"Executing JQL: {jql_query}")

# Pagination setup
start_at = 0
max_results = 50
total_issues = []

while True:
    issues = jira.search_issues(jql_query, startAt=start_at, maxResults=max_results)
    if not issues:
        break
    total_issues.extend(issues)
    start_at += max_results

print(f"Total issues retrieved: {len(total_issues)}")

# Open the changelog file for writing
try:
    with open('changelog-new.md', 'w') as changelog_file:
        changelog_file.write("# Changelog\n\n")
        changelog_file.write("## All Done Epics and Bugs\n\n")

        # if version:
        #     changelog_file.write(f"## Version {version}\n\n")
        # else:
        #     changelog_file.write("## All Done Epics and Bugs\n\n")

        filtered_issues = []

        for issue in total_issues:
            # Get the components for the issue
            components = issue.fields.components
            component_names = {component.name for component in components} if components else set()

            # Check if any of the components match the allowed list based on the repo
            if allowed_components.intersection(component_names):
                filtered_issues.append(issue)

        if filtered_issues:
            for issue in filtered_issues:
                changelog_file.write(f"- {issue.key}: {issue.fields.summary} ({issue.fields.issuetype.name}) - Components: {', '.join(component_names)}\n")
        else:
            changelog_file.write("No issues found for this repository.\n")

    print("Changelog updated successfully.")
except Exception as e:
    print(f"Error creating changelog-new.md: {e}")