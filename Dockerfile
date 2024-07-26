FROM ubuntu:24.10

# Set the working directory
WORKDIR /app

# Update system and add xz-utils
RUN apt-get update && apt-get install -y xz-utils

# Install dependencies
COPY ./node-v22.tar.xz .

# Extract the tarball on opt directory
RUN tar -xvf node-v22.tar.xz -C /opt

# Set the PATH environment variable
ENV PATH="/opt/node-v22.5.1-linux-x64/bin:${PATH}"

RUN rm node-v22.tar.xz

COPY ./api .

RUN npm install -g yarn

RUN yarn

RUN yarn build

EXPOSE 80

CMD ["yarn", "start"]
