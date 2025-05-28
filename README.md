I'll explain the workflow for updating the version number. Here's the step-by-step process:

1. Create a new version tag locally

```
# Create and push a new version tag
git tag -a v1.0.1 -m "Description of changes in this version"
git push origin v1.0.1
```
2. The GitHub Actions Workflow Process The workflow in deploy.yml handles this automatically:
When you push a new tag, the workflow:
Fetches the latest version using git describe --tags
Updates the version span in index.html
Deploys the updated site

3. Version Numbering Convention

```
v[MAJOR].[MINOR].[PATCH]
Example: v1.0.0
- MAJOR: Breaking changes (v2.0.0)
- MINOR: New features (v1.1.0)
- PATCH: Bug fixes (v1.0.1)
```
4. Complete Example

```
# Make your changes
git add .
git commit -m "feat: added new project section"

# Create new version tag
git tag -a v1.1.0 -m "Added new project section"

# Push changes and tags
git push
git push --tags
```
After these steps:

GitHub Actions detects the new tag
Updates the version in the footer
Deploys the site automatically
The new version appears in the footer as "v1.1.0"

That's it! The workflow automatically handles everything once you push a new tag.