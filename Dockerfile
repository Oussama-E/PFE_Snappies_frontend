# Install thttpd
RUN apk add thttpd

# Create a user for the static website
RUN adduser -D static
USER static
WORKDIR /home/static

# Copy the static website files
COPY . .

# Run thttpd with the specified options
CMD ["thttpd", "-D", "-h", "0.0.0.0", "-p", "3000", "-d", "/home/static", "-u", "static", "-l", "-", "-M", "60"]
