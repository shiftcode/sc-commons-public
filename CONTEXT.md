# Library Release Communication

This context defines the language for how this repository communicates published library versions through GitHub Releases. It exists to keep release discussion and implementation consistent.

## Language

**Release Run**:
A single publishing execution that may publish multiple packages and yields one consolidated GitHub Release.
_Avoid_: deploy, rollout, package release

**Release Tag**:
The Git tag attached to a Release Run record in GitHub Releases, optionally suffixing a PR tag for pull request runs.
_Avoid_: version tag, package tag

**PR Tag**:
The identifier derived from a pull request context and used as an optional suffix in a Release Tag.
_Avoid_: branch name, build number

**Stable Release**:
A GitHub Release created from `main` that represents a non-prerelease publication event.
_Avoid_: production release, final publish

**Pre-release**:
A GitHub Release created from a pull request run and explicitly marked as prerelease.
_Avoid_: draft release, beta by default

**Package Version Set**:
The set of package name/version pairs published in one Release Run.
_Avoid_: changelog, artifact list

**Changelog Link**:
A navigable reference from the GitHub Release body to package changelog entries relevant to the Release Run.
_Avoid_: release note text, commit log
