
# DNS


https://registre.cartesanitaireniger.org/

https://us-east-1.console.aws.amazon.com/route53/v2/hostedzones?region=eu-central-1#ListRecordSets/Z094091025Z43Q4D5SQOG

# dev

```
bun run dev
```

# production
## option 1 : deploy by push on main

the github action will trigger the build and deploy

## option 2 : deploy to gh manually from your laptop

```
./script/release.sh
```
