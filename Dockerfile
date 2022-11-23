FROM public.ecr.aws/sam/build-nodejs16.x:latest

RUN mkdir /opt/nodejs
WORKDIR /opt/nodejs/
COPY scripts scripts
COPY package-layer.json package.json
RUN bash scripts/opencv-calib3d-layer/package-guest-preinstall.bash
RUN bash scripts/opencv-calib3d-layer/package-guest-install.bash
RUN pwd
RUN bash scripts/opencv-calib3d-layer/package-guest-test.bash
RUN node -e "require('@u4/opencv4nodejs'); console.log('require @u4/opencv4nodejs is sucessful')"