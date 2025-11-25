
# DNS

https://registre.cartesanitaireniger.org/

https://us-east-1.console.aws.amazon.com/route53/v2/hostedzones?region=eu-central-1#ListRecordSets/Z094091025Z43Q4D5SQOG

previously

```
www.cartesanitaireniger.org
	
A
	
Simple
	
-
	
Yes
	
d3um0ibitagszc.cloudfront.net.
```

apex

```
cartesanitaireniger.org
	
A
	
Simple
	
-
	
Yes
	
s3-website.eu-central-1.amazonaws.com.
```
# dev

```
bun run dev
```

# production
## deploy by push on main

the github action will trigger the build and deploy


