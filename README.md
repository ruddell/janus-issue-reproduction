## Janus Websocket Disconnect on Stream Destroy Reproduction

```bash
# clone the project and change directory
git clone https://github.com/ruddell/janus-issue-reproduction.git
cd janus-issue-reproduction

# install node dependencies (janus client and color printing)
npm install

# configure your janus IP and secret/token in index.js

# run the index.js which lists streams, creates a stream, then destroys it
# it disconnects before the destroy response is returned (may need to run twice to see issue)
node index.js

# you can also run create.js and destroy.js in separate terminals.  these scripts
# attach a handle to the streaming plugin and either create or destroy the stream
# usually the terminal running "create" disconnects when you run "destroy" in another window
```
