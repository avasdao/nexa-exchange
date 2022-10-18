#!/usr/bin/env bash

apt update && apt upgrade -y

apt install build-essential curl libtool autotools-dev autoconf automake pkg-config libssl-dev libevent-dev libgmp-dev libzmq3-dev bsdmainutils git -y

apt install libboost-system-dev libboost-filesystem-dev libboost-chrono-dev libboost-program-options-dev libboost-test-dev libboost-thread-dev -y

apt install libdb-dev libdb++-dev -y

echo
echo "All libraries have been installed!"
echo

mkdir /root/.nexa
echo -e "server=1\nrpcuser=user\nrpcpassword=password" > /root/.nexa/nexa.conf

echo
echo "Nexa has been configured successfully!"
echo

/root/nexad -daemon

echo
echo "All done!"
echo
echo "Waiting for node to start..."
echo

sleep 10
/root/nexa-cli setminercomment "Nexa.Rocks"
/root/nexa-cli getblockcount
echo
