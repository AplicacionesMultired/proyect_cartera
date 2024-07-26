FROM ubuntu:24.10

# Set the working directory
WORKDIR /app

# Update system and add xz-utils
RUN apt-get update && apt-get install -y xz-utils curl

# Download Node.js with curl
RUN curl -o /tmp/node-22.5.tar.xz https://nodejs.org/dist/v22.5.1/node-v22.5.1-linux-x64.tar.xz

# Create /opt directory and extract Node.js there
RUN mkdir -p /opt && tar -xvf /tmp/node-22.5.tar.xz -C /opt --strip-components=1

# Delete the tar file
RUN rm /tmp/node-22.5.tar.xz

# Add Node.js to the PATH
ENV PATH="/opt/bin:/opt/node-v22.5.1-linux-x64/bin:${PATH}"

RUN npm install -g yarn

COPY ./api .

RUN yarn

RUN yarn build

EXPOSE 4040

CMD ["yarn", "start"]
