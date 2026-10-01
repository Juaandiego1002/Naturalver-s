# Spec Delta

## Purpose

Defines how the brand logo is rendered across the storefront: a single source of truth for the logo, correct intrinsic dimension declaration so it renders sharp and undistorted, and consistent accessible labelling.

## ADDED Requirements

### Requirement: Logo has a single source of truth

The brand logo SHALL be defined in exactly one place. Surfaces that display the logo SHALL derive their rendering from that definition rather than maintaining separate copies.

#### Scenario: No duplicated logo markup

- **WHEN** the codebase is searched for logo markup
- **THEN** only one component defines the logo
- **AND** no component contains its own inline copy of the logo artwork or wordmark

#### Scenario: Unused logo definitions are removed

- **WHEN** a logo definition exists that no surface imports
- **THEN** it does not remain in the codebase

#### Scenario: Header and footer agree

- **WHEN** the header and footer are displayed together
- **THEN** both render the same logo as defined by the single source of truth

### Requirement: Logo renders sharp at its rendered size

The logo SHALL render with visible definition and without blurring, ghosting, or mushiness at the size it is actually displayed, on both standard and high-density screens.

#### Scenario: Navbar logo at display size

- **WHEN** the page is viewed on a screen at 1x or 2x density
- **THEN** the navbar logo is rendered at a resolution sufficient for its displayed size
- **AND** its edges and letterforms are clearly defined

#### Scenario: Asset is not over-downscaled

- **WHEN** the logo asset's pixel dimensions are compared to its rendered dimensions
- **THEN** the asset provides at least the pixel data required for the largest size it is displayed at

### Requirement: Logo is undistorted

The logo SHALL render at its true intrinsic aspect ratio. It SHALL NOT be squashed, stretched, or cropped to fit an assumed box.

#### Scenario: Declared dimensions match the asset

- **WHEN** the dimensions declared for the logo are compared to the asset's real pixel dimensions
- **THEN** the two agree in aspect ratio

#### Scenario: Wide wordmark in a constrained container

- **WHEN** the logo asset is substantially wider than it is tall and is constrained by a fixed height
- **THEN** its width is derived from that height and the asset's own ratio
- **AND** no fixed square width is imposed on it

#### Scenario: No cropping or clipping

- **WHEN** the logo renders inside its container
- **THEN** no part of the artwork is clipped away

### Requirement: Logo reserves layout space without shifting the page

The logo SHALL reserve its space before it loads, so that displaying it does not shift surrounding content.

#### Scenario: Logo loads after initial paint

- **WHEN** the logo asset is still loading while the rest of the page has painted
- **THEN** the space the logo occupies is already reserved
- **AND** the navigation bar does not reflow when it arrives

#### Scenario: Aspect ratio is reserved

- **WHEN** the logo's reserved space is measured before load
- **THEN** it matches the logo's true aspect ratio

### Requirement: Logo fits the navigation bar at every breakpoint

The logo SHALL remain fully visible and legible within the navigation bar's height at every viewport width, and SHALL NOT collide with or displace the navigation links.

#### Scenario: Narrow viewport

- **WHEN** the page is viewed at mobile width
- **THEN** the logo is fully visible within the navigation bar
- **AND** it does not overlap the navigation links

#### Scenario: Wide viewport

- **WHEN** the page is viewed at desktop width
- **THEN** the logo does not grow beyond the navigation bar's height

#### Scenario: Dense navigation

- **WHEN** navigation content is present alongside the logo
- **THEN** both remain legible without either being clipped

### Requirement: Logo is exposed accessibly

The logo SHALL carry an accessible name identifying the brand and the home destination, and SHALL be reachable by keyboard as part of the normal tab order.

#### Scenario: Accessible name

- **WHEN** assistive technology encounters the logo
- **THEN** it is announced with a brand-appropriate name in Spanish
- **AND** the decorative artwork within it is not announced separately

#### Scenario: Keyboard focus

- **WHEN** a user tabs through the navigation bar
- **THEN** the logo receives visible focus when focused

#### Scenario: Destination

- **WHEN** the logo is activated
- **THEN** the user is taken to the storefront home page

### Requirement: Brand wordmark typography follows the type system

Where the logo includes a text wordmark rendered as live text rather than as artwork, that text SHALL follow the primary or secondary family rules and SHALL NOT use a retired family or an undefined font utility.

#### Scenario: Wordmark uses a defined family

- **WHEN** the wordmark is live text
- **THEN** it is rendered in one of the two defined families

#### Scenario: Wordmark is not the script font

- **WHEN** the wordmark is live text
- **THEN** it is not rendered in the low-contrast display family, since the wordmark must remain legible as brand identification