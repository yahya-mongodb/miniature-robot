# How to setup local MongoDB

1. Get the MongoDB binaries from
   1. Internet: https://downloads.mongodb.com/windows/mongodb-windows-x86_64-enterprise-4.4.4.zip
   2. Local:
2. Unzip the binaries into a folder `C:/MongoDB`
3. Set your environment variable (for user), set the path to `C:/MongoDB/bin` (where you can see mongod.exe, mongo.exe and other binaries)
4. Create a data directory, default is `C:/data/db/`, but this can be changed through command line argument or configuration file
5. Create log directory at `C:/data/log/mongodb/`
6. Create a configuration file at `C:/MongoDB/bin/mongod.cfg` with the following contents:

```yaml
systemLog:
  destination: file
  path: "C:/data/log/mongodb/mongod.log"
  logAppend: true
storage:
  dbPath: "C:/data/db/"
  journal:
    enabled: true
net:
  bindIp: 127.0.0.1
  port: 27017
```

6. Start the mongod process with the configuration file: `mongod.exe --config="C:/MongoDB/bin/mongod.cfg"`
