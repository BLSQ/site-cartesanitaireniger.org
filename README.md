
# What it's showing

a react app hosted as a github pages

- https://www.cartesanitaireniger.org/
   - an embbedded iframe to a superset dashboard (see stephane dresse)
   - a way to download reports about population coverage and proposition for improvement of this coverage (see Léa Péligry)
       - the reports are produced by openhexa
       - stored in a public s3 bucket : https://carte-sanitaire-niger-public.s3.eu-central-1.amazonaws.com/
       - for each report we store the "pyramid and file url"       
       - exhibit.bluesquare.org is configured to allow querying this table and build the dropdown
          - see https://github.com/BLSQ/iaso-microplans/blob/exhibit/exhibit.json          
       - there multiple variants that might evolve as time goes by
       - openhexa link : https://app.openhexa.org/workspaces/niger-extension-couverture-sanitaire/
   - some analytics are available through plausible (assuming people don't have adblocker)
       - https://plausible.io/share/cartesanitaireniger.org?auth=eIKgC5jCFkjbssfv1RESD



# dev

```
bun run dev
```

# production
## deploy by push on main

the github action will trigger the build and deploy


